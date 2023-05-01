import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import CustomerService from '@src/services/CustomerService';
import { ICustomer } from '@src/models/Customer';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const customers = await CustomerService.getAll();
  return res.status(HttpStatusCodes.OK).json({ customers });
}

/**
 * Add one user.
 */
async function add(req: IReq<{customer: ICustomer}>, res: IRes) {
  const { customer: user } = req.body;
  await CustomerService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{customer: ICustomer}>, res: IRes) {
  const { customer: user } = req.body;
  await CustomerService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

// /**
//  * Delete one user.
//  */
// async function delete_(req: IReq, res: IRes) {
//   const id = +req.params.id;
//   await UserService.delete(id);
//   return res.status(HttpStatusCodes.OK).end();
// }


// **** Export default **** //

export default {
  getAll,
  add,
  update,
} as const;
