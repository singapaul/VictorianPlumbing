import axios from "axios";
import { ApiResponse, fetchProductsProps } from "./types";

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

    // console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle the API error here
    console.error("API Error:", error);
    return Promise.reject(error);
  }
};

export { fetchProducts };
export type { ApiResponse };
