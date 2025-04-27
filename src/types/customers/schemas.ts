import { z } from 'zod';

// Schemas for create_customer tool
export const createCustomerSchema = {
  email: z.string().describe("Customer's email address"),
  first_name: z.string().optional().describe("Customer's first name"),
  last_name: z.string().optional().describe("Customer's last name"),
  phone: z.string().optional().describe("Customer's phone number"),
  metadata: z.record(z.any()).optional().describe("Additional structured data for the customer")
};

// Schema for update_customer tool
export const updateCustomerSchema = {
  code: z.string().min(1, 'Customer code is required'),
  first_name: z.string().describe("Customer's first name"),
  last_name: z.string().describe("Customer's last name"),
  phone: z.string().optional().describe("Customer's phone number"),
  metadata: z.record(z.any()).optional().describe("A set of key/value pairs that you can attach to the customer. It can be used to store additional information in a structured format.")
};

// Schema for validate_customer tool
export const validateCustomerSchema = {
  code: z.string().min(1, 'Customer code to be identified is required.'),
  country: z.string().length(2, 'Country code must be 2 letters'),
  type: z.enum(['bank_account']).describe("Predefined types of identification. Only bank_account is supported at the moment"),
  account_number: z.string().min(1, 'Account number is required. Customer bank account number. (required if type is bank_account)'),
  bvn: z.string().min(1, 'Customer Bank Verification Number (BVN) is required if type is bank_account)'),
  bank_code: z.string().min(1, 'You can get the list of Bank Codes by calling the List Banks endpoint. (required if type is bank_account)'),
  first_name: z.string().describe("Customer's first name"),
  last_name: z.string().describe("Customer's last name"),
  middle_name: z.string().optional().describe("Customer's middle name"),
};

// Schema for set_risk_action tool
export const setRiskActionSchema = {
  customer: z.string().min(1, 'Customer code or email to be identified is required.'),
  risk_action: z.enum(['default', 'allow', 'deny']).describe("One of the possible risk actions [ default, allow, deny ]. allow to whitelist. deny to blacklist. Customers start with a default risk action."),
};

// Schema for deactivate_authorization tool
export const deactivateAuthorizationSchema = {
  authorization_code: z.string().min(1, 'Authorization code is required'),
};

// Schema for list_customers tool
export const listCustomersSchema = {
  perPage: z.number().positive().describe("Number of records per page (default: 50)"),
  page: z.number().positive().describe("Page number to retrieve (default: 1)"),
  from: z.string().optional().describe("A timestamp from which to start listing customers e.g. 2016-09-24T00:00:05.000Z"),
  to: z.string().optional().describe("A timestamp at which to stop listing customers e.g. 2016-09-24T00:00:05.000Z")
};

// Schema for fetch_customer tool
export const fetchCustomerSchema = {
  email_or_code: z.string().min(1, 'Customer email or code is required'),
};