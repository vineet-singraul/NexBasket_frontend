export interface Category {
  _id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MainCategoryProps = {
  categories: Category[];
};