import {registerProductsTools} from './products.js';
import {registerCustomersTools} from './customers.js';
import {registerTransactionTools} from './transactions.js';
import {registerMiscellaneousTools} from './miscellaneous.js';
import {registerTransferControlTools} from './transfers-control.js';

export function registerTools() {
  registerProductsTools(); // Tools: Create Product, List Products, Get Product, Update Product
  registerCustomersTools(); // Tools: Create Customer, List Customers, Get Customer, Update Customer, Validate Customer, Set Risk Action, Deactivate Authorization
  registerTransactionTools(); // Tools: Initialize Transaction, Verify Transaction, List Transactions, Charge Authorization, Partial Debit
  registerMiscellaneousTools(); // Tools: List Banks, List Countries, List States
  registerTransferControlTools(); // Tools: Check Balance, Balance Ledger, Resend OTP, Disable OTP, Finalize Disable OTP, Enable OTP
}
