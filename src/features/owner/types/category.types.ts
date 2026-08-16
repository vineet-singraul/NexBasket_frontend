export interface CategoryOption {
  id: string
  name: string
}

export interface AddCategoryForm {
  name: string
  slug: string
  description: string
  image: string
  isActive: 'true' | 'false'
}

export interface AddCategoryErrors {
  name: string
  description: string
}

export interface CategoryListItem {
  _id: string
  ownerId: string
  name: string
  slug: string
  description?: string
  image?: string
  isActive?: boolean
  createdAt?: string
}

export interface AddCategoryLeftPannalProps {
  subOwnerId: string
}
