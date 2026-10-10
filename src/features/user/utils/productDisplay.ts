import type { Product } from '../types/common.types.ts'
import { DELIVERY_CHARGE_SLABS, FREE_DELIVERY_ABOVE } from './context.ts'

export const PLACEHOLDER_PRODUCT_IMAGE = 'https://via.placeholder.com/400x400?text=No+Image'

export const getProductImage = (product: Product): string => {
  const primary = product.images?.find((img) => img.isPrimary)
  return primary?.imageUrl || product.images?.[0]?.imageUrl || PLACEHOLDER_PRODUCT_IMAGE
}

export const formatINR = (value: number | undefined | null): string =>
  `₹${(value ?? 0).toLocaleString('en-IN')}`

export const getDeliveryCharge = (price: number): number => {
  if (price > FREE_DELIVERY_ABOVE) return 0
  return DELIVERY_CHARGE_SLABS.find((slab) => price <= slab.upTo)?.charge ?? 0
}
