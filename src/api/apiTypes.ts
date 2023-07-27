export interface ApiResponse {
  pagination: Pagination;
  facets: unknown;
  products: Product[];
}

export type Pagination = {
  from: number;
  size: number;
  sortType: number;
  total: number;
};

export interface Product {
  id: string;
  productName: string;
  image: Image;
  price: Price;
  brand: Brand;
}

export interface Price {
  currencyCode: "string";
  priceIncTax: "string";
}

export interface Image {
  url: string;
}

export interface Brand {
  name: string;
}

export type fetchProductsProps = {
  query: string;
  sortBy: number;
  page: number;
  low: number;
  high: number;
};