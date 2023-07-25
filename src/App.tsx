import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchProducts, ApiResponse } from "./api/fetchProducts";
import Form from "./components/Form";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";
import Filterbar from "./components/Filterbar";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

// @todo assess best practices. e.g. import order
function App() {
  // const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    search: "toilets",
    option: 1,
  });

  // Callback function to receive form data from the child
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleFormSubmit = async (data) => {
    setFormData(data);
  };
  // Use useEffect to trigger the refetch after formData is updated

  // const [showSidebar, setShowSidebar] = useState(false);
  const queryKey = ["products"];
  // const queryKey = ["products", query, page];

  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery<
    ApiResponse,
    Error
  >(queryKey, () => fetchProducts(formData.search, formData?.option), {
    retry: 1,
    onError: (error) => {
      console.error("API Error:", error);
      // You can display an error message here or take other actions as needed.
    },
  });

  // Use the onSuccess callback to trigger the refetch
  useQuery(queryKey, () => fetchProducts(formData.search, formData?.option), {
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    let fetching = false;
    const onScroll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { scrollHeight, scrollTop, clientHeight } =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        console.log("hi");
        fetching = false;
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener("scroll", onScroll);

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && !isSuccess) {
    return (
      <>
        {" "}
        <div className="flex flex-col md:flex-row">
          <Filterbar>
            <Form handleSubmitForm={handleFormSubmit} />
          </Filterbar>
          <div className="md:w-3/4 p-4">
            <div>Error: {error?.message}</div>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Filterbar>
          <Form handleSubmitForm={handleFormSubmit} />
          {/* <input type="number" value={page} onChange={handleChange} />
          <button onClick={submitForm}>Submit</button> */}
        </Filterbar>
        <div className="md:w-3/4 p-4">
          <ErrorBoundary>
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
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default App;
