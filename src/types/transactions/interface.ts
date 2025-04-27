// Transcation Interface
export interface Transaction {
    id: number;
    reference: string;
    amount: number;
    status: string;
    currency: string;
    channel: string;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      metadata: any;
      customer_code: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      card_type: string;
      bank: string;
      channel: string;
      reusable: boolean;
    };
    metadata: any;
    paid_at: string;
    created_at: string;
  }
  
  // Initialize Transaction
  export interface InitializeTransactionParams {
    email: string;
    amount: number;
    currency?: string;
    reference?: string;
    callback_url?: string;
    plan?: string;
    subaccount?: string;
    transaction_charge?: number;
    bearer?: string;
    metadata?: Record<string, any>;
    channels?: string[];
    split_code?: string;
  }
  
  export interface InitializedTransaction {
    authorization_url: string;
    access_code: string;
    reference: string;
  }
  
  // List Transactions
  export interface ListTransactionsParams {
    perPage?: number;
    page?: number;
    from?: string;
    to?: string;
    customer?: string;
    status?: 'success' | 'failed' | 'abandoned' | 'reversed';
    amount?: number;
    channel?: string;
    reference?: string;
  }
  
  // Verify Transaction
  export interface VerifyTransactionParams {
    reference: string;
  }
  
  // Fetch Transaction
  export interface FetchTransactionParams {
    id: number;
  }
  
  // Charge Authorization
  export interface ChargeAuthorizationParams {
    email: string;
    amount: number;
    authorization_code: string;
    reference?: string;
    currency?: string;
    metadata?: Record<string, any>;
  }
  
  // Partial Debit
  export interface PartialDebitParams {
    authorization_code: string;
    currency: string;
    amount: number;
    email: string;
    reference?: string;
    at_least?: number;
  }
  
  // Transaction Totals
  export interface TransactionTotalsParams {
    perPage?: number;
    page?: number;
    from?: string;
    to?: string;
  }
  
  export interface CurrencyAmount {
    currency: string;
    amount: number;
  }
  
  export interface TransactionTotals {
    total_transactions: number;
    total_volume: number;
    total_volume_by_currency: CurrencyAmount[];
    pending_transfers: number;
    pending_transfers_by_currency: CurrencyAmount[];
  }
  
  // Export Transactions
  export interface ExportTransactionsParams {
    perPage?: number;
    page?: number;
    from?: string;
    to?: string;
    customer?: number;
    status?: 'failed' | 'success' | 'abandoned';
    currency?: string;
    amount?: number;
    settled?: boolean;
    settlement?: number;
    payment_page?: number;
  }
  
  export interface ExportTransactionsResponse {
    path: string;
    expiresAt: string;
  } 