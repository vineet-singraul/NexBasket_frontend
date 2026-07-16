export interface CategoryOption {
  id: string
  name: string
}

export interface AddCategoryForm {
  productCategory: string
  categoryDescription: string
  OwnerId:string,
  categoryActive:''
}

export interface AddCategoryErrors {
  productCategory: string
  categoryDescription: string
  OwnerId:string,
  categoryActive:string
}
