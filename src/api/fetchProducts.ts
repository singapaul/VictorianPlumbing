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
  sortType: number;
  total: number;
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

const fetchProducts = async (query: string, sortBy: number, page: number) => {
  const apiUrl =
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
  const apiKey = import.meta.env.VITE_API_KEY;

  const requestBody = {
    query: query,
    pageNumber: page,
    size: 10,
    additionalPages: 0,
    sort: sortBy,
  };

  console.log(requestBody);

  try {
    const response = await axios.post<ApiResponse>(
      apiUrl + `?apikey=${apiKey}`,
      requestBody
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle the API error here
    console.error("API Error:", error);
    return Promise.reject(error);
  }
};

export { fetchProducts };
export type { ApiResponse };
