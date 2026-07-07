export interface CategoryOption {
  id: string
  name: string
}

export interface AddCategoryForm {
  name: string
  description: string
  parentCategory: string | null
}

export interface AddCategoryErrors {
  name?: string
  description?: string
}
