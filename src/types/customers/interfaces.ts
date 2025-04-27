export interface CustomerResponse {
  email: string;
  integration: number;
  domain: string;
  customer_code: string;
  id: number;
  identified: boolean;
  identifications: any[] | null;
  createdAt: string;
  updatedAt: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  metadata: Record<string, any> | null;
  risk_action?: string;
}

export interface CustomerWithDetailsResponse extends CustomerResponse {
  transactions: any[];
  subscriptions: any[];
  authorizations: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string | null;
  }[];
  dedicated_account: any | null;
  total_transactions: number;
  total_transaction_value: any[];
}

export interface PaystackListResponse<T> {
  status: boolean;
  message: string;
  data: T[];
  meta: {
    next?: string;
    previous?: string;
    perPage: number;
  };
}

export interface PaystackSingleResponse<T> {
  status: boolean;
  message: string;
  data: T;
}


export type CreateCustomerParams = {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  metadata?: Record<string, any>;
};

export type ListCustomersParams = {
  perPage?: number;
  page?: number;
  from?: string;
  to?: string;
};

export type UpdateCustomerParams = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  metadata?: Record<string, any>;
};

export type ValidateCustomerParams = {
  code: string;
  country: string;
  type: 'bank_account';
  account_number: string;
  bvn: string;
  bank_code: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
};

export type SetRiskActionParams = {
  customer: string;
  risk_action: 'default' | 'allow' | 'deny';
};

export type DeactivateAuthorizationParams = {
  authorization_code: string;
};