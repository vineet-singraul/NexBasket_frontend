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
  ratings: number
  returnable: string
  warrantyPeriod: string
  weight: string
  dimensions: ProductDimensions
  isActive: string
}

export interface ProductErrors {
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
}
