import { z } from 'zod';

// Schema for initialize_transaction tool
export const initializeTransactionSchema = {
  email: z.string().email('Valid email is required').describe('Customer\'s email address'),
  amount: z.number().int().positive('Amount must be a positive integer').describe('The amount to charge in the subunit of the supported currency'),
  currency: z.string().optional().describe('The currency to charge in. Default is your integration currency.'),
  reference: z.string().describe('Unique transaction reference. Only -, ., = and alphanumeric characters allowed. If not provided, a unique reference will be generated.'),
  callback_url: z.string().url().optional().describe('URL to redirect to after payment. Only required for inline payment methods.'),
  plan: z.string().optional().describe('If transaction is to create a subscription to a predefined plan, provide plan code here.'),
  subaccount: z.string().optional().describe('The code for the subaccount that owns the payment. e.g. ACCT_8f4s1eq7ml6rlzj'),
  transaction_charge: z.number().optional().describe('A flat fee to charge the subaccount for this transaction (in the subunit of the supported currency).'),
  bearer: z.string().optional().describe('Who bears Paystack charges? account or subaccount (defaults to account).'),
  metadata: z.record(z.any()).optional().describe('Additional information to store with the transaction.'),
  channels: z.array(z.string()).optional().describe('An array of payment channels to control what channels you want to make available to the user to make a payment with. Available channels include: ["card", "bank", "apple_pay", "ussd", "qr", "mobile_money", "bank_transfer", "eft"]'),
  split_code: z.string().optional().describe('The split code of the transaction split.'),
};

// Schema for verify_transaction tool
export const verifyTransactionSchema = {
  reference: z.string().min(1, 'Transaction reference is required').describe('The transaction reference to verify'),
};

// Schema for fetch_transaction tool
export const fetchTransactionSchema = {
  id: z.number().int().positive('Transaction ID must be a positive integer').describe('The ID of the transaction to fetch'),
};

// Schema for list_transactions tool
export const listTransactionsSchema = {
  perPage: z.number().int().positive().describe('Number of records to retrieve per page. Default is 50.'),
  page: z.number().int().positive().describe('Page number to retrieve. Default is 1.'),
  from: z.string().optional().describe('Filter transactions from this date. Format: YYYY-MM-DD.'),
  to: z.string().optional().describe('Filter transactions to this date. Format: YYYY-MM-DD.'),
  customer: z.string().optional().describe('Filter transactions by customer ID or code.'),
  status: z.enum(['success', 'failed', 'abandoned']).optional().describe('Filter transactions by status.'),
  amount: z.number().optional().describe('Filter transactions by amount. Value is in kobo, pesewas or cents.'),
  channel: z.string().optional().describe('Filter transactions by channel.'),
  reference: z.string().optional().describe('Filter transactions by reference.'),
};

// Schema for charge_authorization tool
export const chargeAuthorizationSchema = {
  email: z.string().email('Valid email is required').describe('Customer\'s email address'),
  amount: z.number().int().positive('Amount must be a positive integer').describe('The amount to charge in the subunit of the supported currency'),
  authorization_code: z.string().min(1, 'Authorization code is required').describe('Authorization code for the transaction'),
  reference: z.string().optional().describe('Unique transaction reference. If not provided, a unique reference will be generated.'),
  currency: z.string().optional().describe('The currency to charge in. Default is your integration currency.'),
  metadata: z.record(z.any()).optional().describe('Additional information to store with the transaction.'),
};

// Schema for partial_debit tool
export const partialDebitSchema = {
  authorization_code: z.string().min(1, 'Authorization code is required').describe('Authorization code for the transaction'),
  currency: z.string().min(1, 'Currency is required').describe('The currency to charge in. Default is your integration currency.'),
  amount: z.number().int().positive('Amount must be a positive integer').describe('The amount to charge in the subunit of the supported currency'),
  email: z.string().email('Valid email is required').describe('Customer\'s email address'),
  reference: z.string().optional().describe('Unique transaction reference. If not provided, a unique reference will be generated.'),
  at_least: z.number().optional().describe('Minimum amount to charge in kobo, pesewas or cents.'),
};

// Schema for transaction_totals tool
export const transactionTotalsSchema = {
  perPage: z.number().int().positive().describe('Number of records to retrieve per page. Default is 50.'),
  page: z.number().int().positive().describe('Page number to retrieve. Default is 1.'),
  from: z.string().optional().describe('A timestamp from which to start listing transaction e.g. 2016-09-24T00:00:05.000Z'),
  to: z.string().optional().describe('A timestamp at which to stop listing transaction e.g. 2016-09-24T00:00:05.000Z'),
};

// Schema for export_transactions tool
export const exportTransactionsSchema = {
  perPage: z.number().int().positive().describe('Specify how many records you want to retrieve per page. Default is 50.'),
  page: z.number().int().positive().describe('Specify exactly what page you want to retrieve. Default is 1.'),
  from: z.string().optional().describe('A timestamp from which to start listing transaction e.g. 2016-09-24T00:00:05.000Z, 2016-09-21'),
  to: z.string().optional().describe('A timestamp at which to stop listing transaction e.g. 2016-09-24T00:00:05.000Z, 2016-09-21'),
  customer: z.number().int().optional().describe('Specify an ID for the customer whose transactions you want to retrieve'),
  status: z.enum(['failed', 'success', 'abandoned']).optional().describe('Filter transactions by status'),
  currency: z.string().optional().describe('Specify the transaction currency to export'),
  amount: z.number().int().optional().describe('Filter transactions by amount, using the supported currency'),
  settled: z.boolean().optional().describe('Set to true to export only settled transactions. false for pending transactions. Leave undefined to export all transactions'),
  settlement: z.number().int().optional().describe('An ID for the settlement whose transactions we should export'),
  payment_page: z.number().int().optional().describe('Specify a payment page\'s id to export only transactions conducted on said page'),
}; 