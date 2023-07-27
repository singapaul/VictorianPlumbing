import { Key, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchProducts, ApiResponse } from "./api/fetchProducts";
import { FormData, Product } from "./types/types";
import Filterbar from "./components/Filterbar";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";
import React from "react";
import Form from "./components/Form";

// @todo assess best practices. e.g. import order
function App() {

  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    search: "toilets",
    option: 1,
    low: 0,
    high: 10000,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const fetchProductsData = async ({ pageParam = 0 }) => {
    return await fetchProducts({
      query: formData.search,
      sortBy: formData.option,
      page: pageParam,
      high: formData.high,
      low: formData.low,
    });
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
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.products.length === 10 ? allPages.length + 1 : undefined;
      return nextPage;
    },
    retry: 1,
    onError: (error) => {
      console.error("API Error:", error);
    },
  });

  useEffect(() => {
    const onScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (
        !isFetching &&
        hasNextPage &&
        scrollHeight - scrollTop <= clientHeight * 1.5
      ) {
        setIsFetching(true);
        fetchNextPage();
      }
    };

    if (!isFetching) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.addEventListener("scroll", onScroll);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.removeEventListener("scroll", onScroll);
    };
  }, [hasNextPage, fetchNextPage, isFetching, isLoading]);

  useEffect(() => {
    setIsFetching(false);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [formData, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <>
        {" "}
        <div className="flex flex-col md:flex-row">
          <Filterbar>
            {/* <Form handleSubmitForm={handleFormSubmit} /> */}
            <Form handleSubmitForm={handleFormSubmit} />
          </Filterbar>
          <div className="md:w-3/4 p-4">
            <div>Error: {error?.message}</div>
            <p>please reload page</p>
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
                  (product: Product, index: Key | null | undefined) => (
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
