export interface ListedProduct {
  _id: string;
  id: string;

  storeId: string;
  title: string;
  slug: string;
  productCode: string;
  productType: string;

  categoryId: string;

  description: string;
  shortDescription: string;

  highlights: string[];
  features: string[];
  whatsIncluded: string[];

  brand: string;
  manufacturer: string;
  modelName: string;
  modelNumber: string;
  manufacturerPartNumber: string;

  importerName: string;
  packerName: string;
  countryOfOrigin: string;

  hsnCode: string;
  taxCode: string;

  metaTitle: string;
  metaDescription: string;

  searchKeywords: string[];
  tags: string[];

  returnPolicy: string;
  returnDays: number;

  condition: string;
  status: string;
  visibility: string;

  isFeatured: boolean;
  isActive: boolean;

  sku: string;
  variantName: string;

  attributes: {
    color: string;
    size: string;
  };

  gtin: string;
  isDefault: boolean;

  isProductListtingComplete: boolean;

  warranty: Warranty;
  weight: Weight;
  dimensions: Dimensions;
  pricing: Pricing;
  inventory: Inventory;

  specifications: Specification[];

  availableQuantity: number;

  createdAt: string;
  updatedAt: string;
}

export interface Warranty {
  duration: number;
  unit: string;
  type: string;
  description: string;
}

export interface Weight {
  value: number;
  unit: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface Pricing {
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  costPrice: number;
  taxPercent: number;
  currency: string;
}

export interface Inventory {
  quantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
  stockStatus: string;
}

export interface Specification {
  name: string;
  value: string;
  unit: string | null;
  _id: string;
  id: string;
}






// +++++++++++ < Store types > ++++++++++++
export interface ListedStore {
  _id: string;
  owner: string;

  storeName: string;
  password: string;
  description: string;

  email: string;
  phone: string;
  gstNumber: string;

  logo: string;
  banner: string;

  rating: number;
  totalSales: number;

  active: boolean;

  address: StoreAddress;

  createdAt: string;
  updatedAt: string;

  __v: number;
}


export interface StoreAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}




export interface OwnerDashboardResponse {
  success: boolean;
  message: string;
  productCount: number;
  storeCount: number;
  ListedProduct: ListedProduct[];
  listedStore: ListedStore[];
}

export interface counts {
      productCount: number;
    storeCount: number;
}

export type OwnerdashboardCardsProps = {
  productListingDetails: ListedProduct[] | null
  listedStoreDetails: ListedStore[] | null
  counts: counts | null
}

export type OwnerListedProductProps = {
  productListingDetails?: ListedProduct[] | null
}

export type OwnerListedStoreProps = {
  listedStoreDetails?: ListedStore[] | null
} 