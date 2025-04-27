import { z } from 'zod';

export const balanceLedgerSchema = {
  perPage: z.number().positive().describe('Number of records to retrieve per page. Default is 50.'),
  page: z.number().positive().describe('Page number to retrieve. Default is 1.'),
  from: z.string().optional().describe('A timestamp from which to start listing balance ledger entries e.g. 2016-09-24T00:00:05.000Z'),
  to: z.string().optional().describe('A timestamp at which to stop listing balance ledger entries e.g. 2016-09-24T00:00:05.000Z')
};

export const resendOtpSchema = {
  transfer_code: z.string().min(1).describe('Transfer code'),
  reason: z.enum(['resend_otp', 'transfer']).describe('Either resend_otp or transfer')
};

export const finalizeDisableOtpSchema = {
  otp: z.string().min(1).describe('OTP sent to business phone to verify disabling OTP requirement')
};
