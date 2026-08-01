export interface ProductCategoryOption {
  _id: string
  productCategory: string
}

export interface ProductDimensions {
  length: string
  width: string
  height: string
}

export interface Product {
  _id?: string
  store: string
  category: string
  name: string
  description: string
  description1: string
  brand: string
  price: string
  mrp: string
  discountPercent: string
  stock: string
  sku: string
  tags: string[]
  ratings: {
    average: number
    count: number
  }
  returnable: boolean
  warrantyPeriod: string
  weight: string
  dimensions: ProductDimensions
  isActive: boolean
  length: string
  width :string
  height :string
}

export interface ProductErrors {
  store: string
  category: string
  name: string
  description: string
  description1: string
  brand: string
  price: string
  mrp: string
  discountPercent: string
  stock: string
  sku: string
  warrantyPeriod: string
  weight: string
  length: string
  width: string
  height: string
  tags: string
}




