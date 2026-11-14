// ===== Store / Owner =====

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface OwnerDetails {
  address: Address;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ===== Product sub-objects =====

export interface Warranty {
  duration?: number;
  unit?: string; // "years" | "months"
  type?: string; // "manufacturer"
  description?: string;
}

export interface Weight {
  value?: number;
  unit: string; // "g" | "kg"
}

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
  unit: string; // "cm"
}

export interface Pricing {
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  costPrice: number;
  taxPercent: number;
  currency: string; // "INR"
}

export interface Inventory {
  quantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
  stockStatus: string; // "in_stock" | "low_stock" | "out_of_stock"
}

export interface Specification {
  name: string;
  value: string | number;
  unit: string | null;
  _id: string;
  id: string;
}

export interface ProductImage {
  _id: string;
  productId: string;
  imageUrl: string;
  publicId: string;
  altText: string;
  imageType: string; // "gallery"
  sortOrder: number;
  isPrimary: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// ===== Product =====

export interface OwnerDetailsTypes {
  warranty?: Warranty;
  weight: Weight;
  dimensions: Dimensions;
  pricing: Pricing;
  inventory: Inventory;
  _id: string;
  storeId: string;
  title: string;
  slug: string;
  productCode: string;
  productType: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  fullDescription?: string;
  highlights: string[];
  features: string[];
  whatsIncluded: string[];
  brand: string;
  manufacturer?: string;
  modelName?: string;
  modelNumber?: string;
  manufacturerPartNumber?: string;
  importerName?: string;
  packerName?: string;
  countryOfOrigin?: string;
  hsnCode: string;
  taxCode: string;
  metaTitle: string;
  metaDescription: string;
  searchKeywords: string[];
  tags: string[];
  returnPolicy: string;
  returnDays: number;
  condition: string; // "new" | "used"
  status: string; // "active"
  visibility: string; // "public"
  isFeatured: boolean;
  isActive: boolean;
  sku: string;
  variantName: string;
  attributes: Record<string, unknown>;
  gtin: string;
  isDefault: boolean;
  isProductListtingComplete: boolean;
  specifications: Specification[];
  isImageUploaded: boolean;
  isUploadedActualProduct: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  availableQuantity: number;
  id: string;
  images: ProductImage[];

  // Fields that appear only on some products (inconsistent data)
  productIs?: string;
}

// ===== Top-level response =====

export interface StoreProductsResponse {
  ownerId: string;
  ownerDetails: OwnerDetails;
  productWithImages: OwnerDetailsTypes[];
}