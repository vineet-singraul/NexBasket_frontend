export interface popUpInfoInterface {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  loadingText:string,
  defaultText:string
}



export interface Owner {
  id: string
  fullName: string
  email: string
  mobile: string
  role: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export type OwnerProfilePopUpProps = {
  open: boolean
  onClose: () => void
  owner: Owner | null
}
