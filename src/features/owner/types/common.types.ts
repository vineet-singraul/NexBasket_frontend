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