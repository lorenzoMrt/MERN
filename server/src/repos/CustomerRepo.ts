import { ICustomer } from '@src/models/Customer';
import orm from './Orm';


// **** Functions **** //

/**
 * Get one customer.
 */
async function getOne(name: string): Promise<ICustomer | null> {
  const db = await orm.openDb();
  const result = await db.findOne({name: name});
  return result as unknown as ICustomer;
}

/**
 * See if a customer with the given id exists.
 */
async function persists(name: string): Promise<boolean> {
  const db = await orm.openDb();
  const res = await db.findOne({name: name});
  return res !== null;
}

/**
 * Get all customers.
 */
async function getAll(): Promise<ICustomer[]> {
  const db = await orm.openDb();
  const result = await db.find({}).toArray();
  return result as unknown as ICustomer[];
}

/**
 * Add one customer.
 */
async function add(customer: ICustomer): Promise<string> {
  const db = await orm.openDb();
  const result = await db.insertOne(customer);
  return result.insertedId.toString();
}

/**
 * Update a customer.
 */
async function update(customer: ICustomer): Promise<void> {
  const db = await orm.openDb();
  const result = await db.updateOne({name: customer.name}, {$set: customer});
  return result.modifiedCount === 1 ? Promise.resolve() : Promise.reject();
}
// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
} as const;
