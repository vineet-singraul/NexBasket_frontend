export interface Errors {
  owner?: string;
  storeName?: string;
  logo?: string;
  banner?: string;
  description?: string;
  email?: string;
  phone?: string;
  gstNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  active?: string;
}

export interface Store {
  owner: string;
  storeName: string;
  logo: File | null;
  banner: File | null;
  description: string;
  email: string;
  phone: string;
  gstNumber: string;

  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };

  rating: number;
  totalSales: number;
  active: boolean;
}

export interface StoreListItem {
  _id: string;
  storeName: string;
  logo?: string | null;
  banner?: string | null;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  active?: boolean;
  rating?: number;
  totalSales?: number;
}