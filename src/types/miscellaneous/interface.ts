// Bank interface
export interface Bank {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Country interface
export interface Country {
  id: number;
  name: string;
  iso_code: string;
  default_currency_code: string;
  integration_defaults: Record<string, any>;
  relationships: {
    currency: {
      type: string;
      data: string[];
    };
    integration_feature: {
      type: string;
      data: string[];
    };
    integration_type: {
      type: string;
      data: string[];
    };
    payment_method: {
      type: string;
      data: string[];
    };
  };
}

// State interface
export interface State {
  name: string;
  slug: string;
  abbreviation: string;
}

// List Banks Parameters
export interface ListBanksParams {
  country?: string;
  use_cursor?: boolean;
  perPage?: number;
  pay_with_bank_transfer?: boolean;
  pay_with_bank?: boolean;
  enabled_for_verification?: boolean;
  next?: string;
  previous?: string;
  gateway?: string;
  type?: string;
  currency?: string;
  include_nip_sort_code?: boolean;
}

// List States Parameters
export interface ListStatesParams {
  country: string;
}
