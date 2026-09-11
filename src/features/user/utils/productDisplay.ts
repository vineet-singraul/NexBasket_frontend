import type { Product } from '../types/common.types.ts'

export const PLACEHOLDER_PRODUCT_IMAGE = 'https://via.placeholder.com/400x400?text=No+Image'

export const getProductImage = (product: Product): string => {
  const primary = product.images?.find((img) => img.isPrimary)
  return primary?.imageUrl || product.images?.[0]?.imageUrl || PLACEHOLDER_PRODUCT_IMAGE
}

export const formatINR = (value: number | undefined | null): string =>
  `₹${(value ?? 0).toLocaleString('en-IN')}`
