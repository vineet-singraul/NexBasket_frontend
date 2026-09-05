export interface ListedProduct {
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

// +++++++++++ < Store types > ++++++++++++
export interface ListedStore {
  _id: string
  owner: string

  storeName: string
  password: string
  description: string

  email: string
  phone: string
  gstNumber: string

  logo: string
  banner: string

  rating: number
  totalSales: number

  active: boolean

  address: StoreAddress

  createdAt: string
  updatedAt: string

  __v: number
}

export interface StoreAddress {
  street: string
  city: string
  state: string
  country: string
  pincode: string
}

export interface OwnerDashboardResponse {
  success: boolean
  message: string
  productCount: number
  storeCount: number
  ListedProduct: ListedProduct[]
  listedStore: ListedStore[]
}

export interface counts {
  productCount: number
  storeCount: number
}

export type OwnerdashboardCardsProps = {
  productListingDetails: ListedProduct[] | null
  listedStoreDetails: ListedStore[] | null
  counts: counts | null
  onProductUpdated?: (product: ListedProduct) => void
}

export type OwnerListedProductProps = {
  productListingDetails?: ListedProduct[] | null
  onProductUpdated?: (product: ListedProduct) => void
}

export type OwnerListedStoreProps = {
  listedStoreDetails?: ListedStore[] | null
}

// Deep deatls of Owner cards :
export type OwnerDeepDetailsOfOwnerCardsProps = {
  cardData: {
    inStockCount: number | null
    lowStockCount: number | null
    outOfStockCount: number | null
    id: number | null
    ListedProductCount: number | null
  }
}

export interface cardsData {
  inStockCount: number | null
  lowStockCount: number | null
  outOfStockCount: number | null
  id: number | null
  ListedProductCount: number | null
}

export const DeepDetailsOfCardsList = {
  ListedProduct: {
    id: 1,
    title: 'Listed products',
    marginProfitOrLoss: 'from last month',
    detail: ' How your catalog breaks down by fulfillment readiness.',
  },
  ListedStore: {
    id: 2,
    title: 'Listed Store',
    marginProfitOrLoss: 'from last month',
    detail: ' How your Store breaks down by fulfillment Store.',
  },
  Orders: {
    id: 3,
    title: 'All Order',
    marginProfitOrLoss: 'from last month',
    detail: ' How your Orders breaks down by fulfillment Orders.',
  },
}

// Common DeleteBar
export type CommonDeleteProps = {
  onClose: () => void
  onDelete: () => void
}


















// +++++++++++ EDIT BASE PRODUCT TYPES ++++++++++++
export type EditBaseProductForm = {
  title: string
  description: string
  shortDescription: string
  fullDescription: string
  highlights: string
  features: string
  whatsIncluded: string

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

  warrantyDuration: string
  warrantyUnit: string
  warrantyType: string
  warrantyDescription: string

  metaTitle: string
  metaDescription: string
  searchKeywords: string
  tags: string[]

  returnPolicy: string
  returnDays: string

  productType: string
  condition: string
  status: string
  visibility: string
  isFeatured: boolean
  isActive: boolean

  sku: string
  variantName: string
  attributeColor: string
  attributeSize: string
  gtin: string

  weight: string
  weightUnit: string
  Length: string
  Width: string
  Height: string
  dimensionUnit: string
  DefaultVariant: boolean

  mrp: string
  sellingPrice: string
  discount: string
  costPrice: string
  taxPercent: string
  currency: string

  quantity: string
  reservedQuantity: string
  lowStockThreshold: string
  allowBackorder: boolean
  stockStatus: string
}



export type EditBaseProductProps = {
  open: boolean
  onClose: () => void
  id: string
  onUpdated?: (product: ListedProduct) => void
}