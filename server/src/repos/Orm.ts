import jsonfile from 'jsonfile';

import { ICustomer } from '@src/models/Customer';
import { Collection, Db, MongoClient, Document } from 'mongodb';


// **** Variables **** //

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url, 
  { pkFactory: { createPk: () => new Date().getTime() } },
);
const dbName = 'bob-db';



// **** Types **** //

export interface IDb {
  customers: ICustomer[];
}


// **** Functions **** //

/**
 * Fetch the json from the file.
 */
async function openDb(): Promise<Collection<Document>> {
  await client.connect();
  const db = client.db(dbName);
  const customers = db.collection('customers');
  return customers;
}




// **** Export default **** //

export default {
  openDb,
} as const;
