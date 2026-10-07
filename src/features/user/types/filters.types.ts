
export interface FilterOption {
  value: string;
  count: number;
  _id: string;
}

export type FilterType = "range" | "checkbox";

export interface ProductFilter {
  name: string;
  key: string;
  type: FilterType;
  min: number | null;
  max: number | null;
  options: FilterOption[];
  _id: string;
}

export interface ProductFilterGroup {
  _id: string;
  name: string;
  productType: string;
  filters: ProductFilter[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FilterApiResponse {
  success: boolean;
  message: string;
  Fillters: ProductFilterGroup[];
}



export type sendToShowAllFilltersPage = {
  fillter : ProductFilterGroup
}


export type RangeValue = [number, number]

export type RangeProps = {
  filter: ProductFilter
//   value?: RangeValue
//   onChange: (key: string, value: RangeValue) => void
}


export type CheckBoxProps = {
  filter: ProductFilter
//   value?: RangeValue
//   onChange: (key: string, value: RangeValue) => void
}