import type {Product} from "../types/product.types"

export interface addImageProductPopUpProps {
  addImageOapen: boolean
  handleCloseImageConatiner: () => void
  selectedProduct: Product | null
}


export interface selectedImageInterface {
  file : object
}


export interface ProductImageInterface {
  productId: string;
  imageUrl: string;
  publicId: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FetchedImage {
  id: string
  imageUrl: string
  isPrimary?: boolean
}