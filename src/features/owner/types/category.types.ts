export interface CategoryOption {
  id: string
  name: string
}

export interface AddCategoryForm {
  name: string
  description: string
  subOwner:string,
  isActive:''
}

export interface AddCategoryErrors {
  name: string
  description: string
  subOwner:string,
  isActive:string
}
