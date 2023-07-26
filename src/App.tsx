/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Key, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchProducts, ApiResponse } from "./api/fetchProducts";
import Form from "./components/Form";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";
import Filterbar from "./components/Filterbar";
import "./App.css";
import React from "react";
import Button from "./components/Button";

// @todo assess best practices. e.g. import order
function App() {
  // const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    search: "toilets",
    option: 1,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleFormSubmit = async (data) => {
    setFormData(data);
  };

  const fetchProductsData = async ({ pageParam = 1 }) => {
    return await fetchProducts(formData.search, formData.option, pageParam);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery<ApiResponse, Error>(["products"], fetchProductsData, {
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      const nextPageStart = pagination.from + pagination.size;
      return nextPageStart < pagination.total ? nextPageStart : undefined;
    },
    retry: 1,
    onError: (error) => {
      console.error("API Error:", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [formData, refetch]);

  useEffect(() => {
    const onScroll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { scrollHeight, scrollTop, clientHeight } =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.target.scrollingElement;

      if (
        !isLoading &&
        hasNextPage &&
        scrollHeight - scrollTop <= clientHeight * 1.5
      ) {
        fetchNextPage();
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
  }, [isLoading, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && !data) {
    return (
      <>
        {" "}
        <div className="flex flex-col md:flex-row">
          <Filterbar>
            <Form handleSubmitForm={handleFormSubmit} />
          </Filterbar>
          <div className="md:w-3/4 p-4">
            <div>Error: {error?.message}</div>
            <Button
              label="Refresh Page"
              type="button"
              onClick={() => window.location.reload}
            />
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
        </Filterbar>
        <div className="md:w-3/4 p-4">
          <ProductGrid>
            {data?.pages.map((page) => (
              <React.Fragment key={page.pagination.from}>
                {page.products.map(
                  (
                    product: {
                      productName: string;
                      brand: { name: string };
                      price: { priceIncTax: string };
                      image: { url: string | undefined };
                    },
                    index: Key | null | undefined
                  ) => (
                    <ProductCard
                      key={index}
                      name={product.productName}
                      brand={product.brand.name}
                      price={product.price.priceIncTax}
                      imageSource={product.image.url}
                    />
                  )
                )}
              </React.Fragment>
            ))}
          </ProductGrid>
        </div>
      </div>
    </>
  );
}

export default App;
