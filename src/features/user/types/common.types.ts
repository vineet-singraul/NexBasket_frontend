export interface Product {
  _id: string
  id: string

  storeId: string
  title: string
  slug: string
  productCode: string
  productType: string

  categoryId: string

  description: string
  shortDescription: string

  highlights: string[]
  features: string[]
  whatsIncluded: string[]

  brand: string
  manufacturer: string
  modelName: string
  modelNumber: string
  manufacturerPartNumber: string

  importerName: string
  packerName: string
  countryOfOrigin: string

  hsnCode: string
  taxCode: string

  metaTitle: string
  metaDescription: string

  searchKeywords: string[]
  tags: string[]

  returnPolicy: string
  returnDays: number

  condition: string
  status: string
  visibility: string

  isFeatured: boolean
  isActive: boolean

  sku: string
  variantName: string

  attributes: {
    color: string
    size: string
  }

  gtin: string
  isDefault: boolean

  isProductListtingComplete: boolean

  warranty: Warranty
  weight: Weight
  dimensions: Dimensions
  pricing: Pricing
  inventory: Inventory

  specifications: Specification[]

  availableQuantity: number

  createdAt: string
  updatedAt: string

  images: Image[]
category: Category[];
  count: number
}

export interface Category {
  _id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface Image {
  _id: string;
  productId: string;
  imageUrl: string;
  publicId: string;
  altText: string;
  imageType: "product" | "thumbnail" | "gallery" | "detail";
  sortOrder: number;
  isPrimary: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}


export interface Warranty {
  duration: number
  unit: string
  type: string
  description: string
}

export interface Weight {
  value: number
  unit: string
}

export interface Dimensions {
  length: number
  width: number
  height: number
  unit: string
}

export interface Pricing {
  mrp: number
  sellingPrice: number
  discountPercent: number
  costPrice: number
  taxPercent: number
  currency: string
}

export interface Inventory {
  quantity: number
  reservedQuantity: number
  lowStockThreshold: number
  allowBackorder: boolean
  stockStatus: string
}

export interface Specification {
  name: string
  value: string
  unit: string | null
  _id: string
  id: string
}



