export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  createdAt: number;
  image?: string;
  isOnSale?: boolean;
  salePrice?: number;
}

export enum ProductSortBy {
  PRICE_ASC,
  PRICE_DESC,
  LATEST,
}
