import type React from 'react'

// export interface baseProductInterface {
//   // Identity
//   storeId: string
//   categoryId: string
//   title: string
//   slug?: string
//   productCode?: string
//   productType?: string

//   // Content
//   description?: string
//   shortDescription?: string
//   highlights?: string[]
//   features?: string[]
//   whatsIncluded?: string[]

//   // Brand
//   brand?: string
//   manufacturer?: string
//   modelName?: string
//   modelNumber?: string
//   manufacturerPartNumber?: string
//   importerName?: string
//   packerName?: string
//   countryOfOrigin?: string

//   // Compliance
//   hsnCode?: string
//   taxCode?: string

//   // Warranty
//   warranty?: {
//     duration?: number
//     unit?: 'days' | 'months' | 'years'
//     type?: 'manufacturer' | 'seller' | 'brand' | 'no_warranty'
//     description?: string
//   }

//   // SEO
//   metaTitle?: string
//   metaDescription?: string
//   searchKeywords?: string[]
//   tags: string[]

//   // Return
//   returnPolicy?: string
//   returnDays?: number

//   // Status
//   condition?: 'new' | 'used' | 'refurbished'
//   status: 'draft' | 'active' | 'inactive' | 'blocked' | 'archived'
//   visibility?: 'public' | 'private' | 'hidden'
//   featured: boolean
//   active: boolean
// }











// Fiest Step : 1 : Basic Details

export interface BaseProductInterFace {
  storeID: string
  categoryId: string
  title: string
  slug: string
  productCode: string
  productType: string
  condition: string
  shortDiscription: string
}

export interface StepBasicDetailsProps {
  data: BaseProductInterFace
  setFormsData: React.Dispatch<React.SetStateAction<BaseProductInterFace>>
}

// Second Step : 2  Product Information

export interface ProductInformationInterface {
  description: string
  highlights?: string[]
  features?: string[]
  whatsIncluded?: string[]
  brand?: string
  manufacturer?: string
  modelName?: string
  modelNumber?: string
  manufacturerPartNumber?: string
}

export interface StepProductInformationProps {
  data: ProductInformationInterface
  setFormsData: React.Dispatch<React.SetStateAction<ProductInformationInterface>>
}

// Thired Step : 3 : Compilance and Warranty

export interface ProductCompilanceWarrenty {
  importerName?: string
  packerName?: string
  countryOfOrigin?: string
  hsnCode?: string
  taxCode?: string
  warranty?: {
    duration?: number
    unit?: 'days' | 'months' | 'years'
    type?: 'manufacturer' | 'seller' | 'brand' | 'no_warranty'
    description?: string
  }
  returnPolicy?: string
  returnDays?: number
  isReturnable: boolean
  duration: string
}

export interface stepProductCompilanceWarrenty {
  data: ProductCompilanceWarrenty
  setFormData: React.Dispatch<React.SetStateAction<ProductCompilanceWarrenty>>
}

// Foure Step : 4: : Varient :
export interface ProductVarientInterface {
  sku: string
  variantName?: string
  gtin?: string
  weight?: {
    value?: number
    unit?: 'mg' | 'g' | 'kg' | 'oz' | 'lb'
  }
  dimensions?: {
    length?: number
    width?: number
    height?: number
    unit?: 'mm' | 'cm' | 'm' | 'in' | 'ft'
  }
  attribute?: {
    name: string
    value: string
  },
  defaltVarient?: boolean
}


export interface Attribute {
  name : string,
  value : string
}


export interface StepProductVarient {
  data : ProductVarientInterface,
  setFormData: React.Dispatch<React.SetStateAction<ProductCompilanceWarrenty>>
}

// Fifth Step : 5 : Specifications

export interface SpecificationItem {
  name: string
  value: string
}

export interface ProductSpecificationInterface {
  specifications?: SpecificationItem[]
}

export interface StepProductSpecificationProps {
  data: ProductSpecificationInterface
  setFormData: React.Dispatch<React.SetStateAction<ProductSpecificationInterface>>
}

// Sixth Step : 6 : Pricing & Inventory

export interface ProductPricingInventoryInterface {
  mrp?: number
  sellingPrice?: number
  costPrice?: number
  discountPercent?: number
  taxPercent?: number
  currency?: 'INR' | 'USD'
  quantity?: number
  reservedQuantity?: number
  lowStockThreshold?: number
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'backorder'
  allowBackorder?: boolean
}

export interface StepProductPricingInventoryProps {
  data: ProductPricingInventoryInterface
  setFormData: React.Dispatch<React.SetStateAction<ProductPricingInventoryInterface>>
}

// Seventh Step : 7 : SEO & Product Management

export interface ProductSeoManagementInterface {
  metaTitle?: string
  metaDescription?: string
  searchKeywords?: string
  tags?: string[]
  status?: 'draft' | 'active' | 'inactive' | 'blocked' | 'archived'
  visibility?: 'public' | 'private' | 'hidden'
  isFeatured?: boolean
  isActive?: boolean
}

export interface StepProductSeoManagementProps {
  data: ProductSeoManagementInterface
  setFormData: React.Dispatch<React.SetStateAction<ProductSeoManagementInterface>>
}