import "./App.css";
import { useQuery } from "react-query";
import { fetchProducts, ApiResponse } from "./api/fetchProducts";
import Form from "./components/Form";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";

// @todo assess best practices. e.g. import order
function App() {
  const query = "toilets";
  const pageNumber = 0;

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>(
    ["products", query, pageNumber],
    () => fetchProducts(query, pageNumber)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <Form />
      <ProductGrid>
        {data?.products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.productName}
            brand={product.brand.name}
            price={product.price.priceIncTax}
            imageSource={product.image.url}
          />
        ))}
      </ProductGrid>
    </>
  );
}

export default App;
