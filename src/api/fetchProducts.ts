import axios from "axios";
import { ApiResponse, fetchProductsProps } from "./apiTypes";

const fetchProducts = async ({
  query,
  sortBy,
  page,
  high,
  low,
}: fetchProductsProps) => {
  const apiUrl =
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
  const apiKey = import.meta.env.VITE_API_KEY;

  const priceTemplate = {
    prices: [
      {
        value: {
          gte: low,
          lte: high,
        },
      },
    ],
  };

  const requestBody = {
    query: query,
    pageNumber: page,
    size: 10,
    additionalPages: 0,
    sort: sortBy,
    facets: priceTemplate,
  };

  try {
    const response = await axios.post<ApiResponse>(
      apiUrl + `?apikey=${apiKey}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
};

export { fetchProducts };
export type { ApiResponse };
