import { z } from 'zod';

// Schema for list_banks tool
export const listBanksSchema = {
  country: z.enum(['ghana', 'kenya', 'nigeria', 'south africa']).describe('The country from which to obtain the list of supported banks. Accepted values are: ghana, kenya, nigeria, south africa'),
  use_cursor: z.boolean().describe('Flag to enable cursor pagination on the endpoint'),
  perPage: z.number().int().positive().describe('The number of objects to return per page. Defaults to 50, and limited to 100 records per page.'),
  pay_with_bank_transfer: z.boolean().optional().describe('A flag to filter for available banks a customer can make a transfer to complete a payment'),
  pay_with_bank: z.boolean().optional().describe('A flag to filter for banks a customer can pay directly from'),
  enabled_for_verification: z.boolean().optional().describe('A flag to filter the banks that are supported for account verification in South Africa. You need to combine this with either the currency or country filter.'),
  next: z.string().optional().describe('A cursor that indicates your place in the list. It can be used to fetch the next page of the list'),
  previous: z.string().optional().describe('A cursor that indicates your place in the list. It should be used to fetch the previous page of the list after an intial next request'),
  gateway: z.string().optional().describe('The gateway type of the bank. It can be one of these: [emandate, digitalbankmandate]'),
  type: z.string().optional().describe('Type of financial channel. For Ghanaian channels, please use either mobile_money for mobile money channels OR ghipps for bank channels'),
  currency: z.string().optional().describe('One of the supported currency'),
  include_nip_sort_code: z.boolean().optional().describe('A flag that returns Nigerian banks with their nip institution code. The returned value can be used in identifying institutions on NIP.'),
};

// Schema for list_states tool
export const listStatesSchema = {
  country: z.string().describe('The country code of the states to list. It is gotten after the charge request.'),
};