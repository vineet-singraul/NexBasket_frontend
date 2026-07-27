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

export interface CategoryListItem {
  _id: string
  productCategory: string
  categoryDescription?: string
  categoryActive?: string | boolean
  OwnerId?: string
  MainOwnerName?: string
  createdAt?: string
}

export interface AddCategoryLeftPannalProps {
  subOwnerId: string
  onCategoryCreated?: () => void
}

export interface AddCategoryRightPannelProps {
  categories: CategoryListItem[]
  loading: boolean
}
