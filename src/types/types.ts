export interface FormData {
  search: string;
  option: number;
  low: number;
  high: number;
}

export interface Product {
  productName: string;
  brand: { name: string };
  price: { priceIncTax: string };
  image: { url: string | undefined };
}