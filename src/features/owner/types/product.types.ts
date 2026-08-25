export interface baseProductInterface {
  // Identity
  storeId: string
  categoryId: string
  title: string
  slug?: string
  productCode?: string
  productType?: string

  // Content
  description?: string
  shortDescription?: string
  highlights?: string[]
  features?: string[]
  whatsIncluded?: string[]

  // Brand
  brand?: string
  manufacturer?: string
  modelName?: string
  modelNumber?: string
  manufacturerPartNumber?: string
  importerName?: string
  packerName?: string
  countryOfOrigin?: string

  // Compliance
  hsnCode?: string
  taxCode?: string

  // Warranty
  warranty?: {
    duration?: number
    unit?: 'days' | 'months' | 'years'
    type?: 'manufacturer' | 'seller' | 'brand' | 'no_warranty'
    description?: string
  }

  // SEO
  metaTitle?: string
  metaDescription?: string
  searchKeywords?: string[]
  tags: string[]

  // Return
  returnPolicy?: string
  returnDays?: number

  // Status
  condition?: 'new' | 'used' | 'refurbished'
  status: 'draft' | 'active' | 'inactive' | 'blocked' | 'archived'
  visibility?: 'public' | 'private' | 'hidden'
  featured: boolean
  active: boolean
}

export interface ProductVariantInterface {
  productId: string;
  sku: string;
  variantName?: string;
  attributes?: Record<string, string | number | boolean>;
  gtin?: string;
  weight?: {
    value?: number;
    unit?: "mg" | "g" | "kg" | "oz" | "lb";
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: "mm" | "cm" | "m" | "in" | "ft";
  };
  isDefault?: boolean;
  isActive?: boolean;
}



export interface BaseProductInterface {
  store: string,
  category: string,
  title: string,
  slug: string,
  productCode: string,
  productType: string,
  condition: string,
  discription: string
}