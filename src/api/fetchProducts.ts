import axios from "axios";

interface ApiResponse {
  // Define your product properties here based on the API response
  pagination: Pagination;
  facets: unknown;
  products: Product[];
}

type Pagination = {
  from: number;
  size: number;
  total: number;
  sortType: number;
};

interface Product {
  id: string;
  productName: string;
  image: Image;
  price: Price;
  brand: Brand;
}

interface Price {
  currencyCode: "string";
  priceIncTax: "string";
}

interface Image {
  url: string;
}

interface Brand {
  name: string;
}

const fetchProducts = async (query: string, pageNumber: number) => {
  const apiUrl =
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
  const apiKey = import.meta.env.VITE_API_KEY;

  const requestBody = {
    query,
    pageNumber,
    size: 10, // Set the desired number of items per page
    additionalPages: 0,
    sort: 1,
  };

  const response = await axios.post<ApiResponse>(
    apiUrl + `?apikey=${apiKey}`,
    requestBody
  );
  return response.data;
};

export { fetchProducts };
export type { ApiResponse };
