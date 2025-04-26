export interface NewProduct {
  title: string;
  description: string;
  price: number;
  createdAt: number;
  image?: string;
  isOnSale?: boolean;
  salePrice?: number;
}

export interface Product extends NewProduct {
  id: string;
}

export enum ProductSortBy {
  PRICE_ASC,
  PRICE_DESC,
  LATEST,
}
