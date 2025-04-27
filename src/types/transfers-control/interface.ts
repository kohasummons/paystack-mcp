import { z } from 'zod';

// Check Balance Response
export interface BalanceData {
  currency: string;
  balance: number;
}

export interface BalanceResponse {
  status: boolean;
  message: string;
  data: BalanceData[];
}

// Balance Ledger Entry
export interface BalanceLedgerEntry {
  integration: number;
  domain: string;
  balance: number;
  currency: string;
  difference: number;
  reason: string;
  model_responsible: string;
  model_row: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Balance Ledger Response
export interface BalanceLedgerResponse {
  status: boolean;
  message: string;
  data: BalanceLedgerEntry[];
  meta: {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
    pageCount: number;
  };
}

// Resend OTP Parameters
export interface ResendOtpParams {
  transfer_code: string;
  reason: 'resend_otp' | 'transfer';
}

// Resend OTP Response
export interface ResendOtpResponse {
  status: boolean;
  message: string;
}

// Disable OTP Response
export interface DisableOtpResponse {
  status: boolean;
  message: string;
}

// Finalize Disable OTP Parameters
export interface FinalizeDisableOtpParams {
  otp: string;
}

// Finalize Disable OTP Response
export interface FinalizeDisableOtpResponse {
  status: boolean;
  message: string;
}

// Enable OTP Response
export interface EnableOtpResponse {
  status: boolean;
  message: string;
}

// Balance Ledger Request Parameters
export interface BalanceLedgerParams {
  perPage?: number;
  page?: number;
  from?: string;
  to?: string;
}