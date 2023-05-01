import { ObjectId } from "mongodb";

export interface ICustomer {
    _id?: ObjectId | undefined;
    name: string;
    bags: number
}

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 
  'object with the appropriate customer keys.';

function new_(name: string, bags: number): ICustomer {
    return {
        name: (name ?? 'Anon'),
        bags: (bags ?? 0),
    };
}

/**
 * Get user instance from object.
 */
function from(param: object): ICustomer {
    // Check is user
    if (!isCustomer(param)) {
      throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    // Get user instance
    const p = param as ICustomer;
    return new_(p.name, p.bags);
  }
  
  /**
   * See if the param meets criteria to be a user.
   */
  function isCustomer(arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === 'object' &&
      'name' in arg &&
      'bags' in arg
    );
  }
  
  
  // **** Export default **** //
  
  export default {
    new: new_,
    from,
    isCustomer,
  } as const;