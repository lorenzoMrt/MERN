import CustomerRepo from '@src/repos/CustomerRepo';
import { ICustomer } from '@src/models/Customer';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'Customer not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<ICustomer[]> {
  return CustomerRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(customer: ICustomer): Promise<string> {
  return CustomerRepo.add(customer);
}

/**
 * Update one user.
 */
async function updateOne(customer: ICustomer): Promise<void> {
  const persists = await CustomerRepo.persists(customer.name);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return CustomerRepo.update(customer);
}

/**
 * Delete a user by their id.
 */
// async function _delete(name: string): Promise<void> {
//   const persists = await CustomerRepo.persists(name);
//   if (!persists) {
//     throw new RouteError(
//       HttpStatusCodes.NOT_FOUND,
//       USER_NOT_FOUND_ERR,
//     );
//   }
//   // Delete user
//   return CustomerRepo.delete(name);
// }


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
} as const;
