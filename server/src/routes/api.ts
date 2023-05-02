import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import Customer from '@src/models/Customer';
import CustomerRoutes from './CustomerRoutes';



const apiRouter = Router(),
  validate = jetValidator();



const customerRouter = Router();

// Get all users
customerRouter.get(
  Paths.Customers.Get,
  CustomerRoutes.getAll,
);

// Add one user
customerRouter.post(
  Paths.Customers.Add,
  validate(['customer', Customer.isCustomer]),
  CustomerRoutes.add,
);


// Add UserRouter
apiRouter.use(Paths.Customers.Base, customerRouter);


// **** Export default **** //

export default apiRouter;
