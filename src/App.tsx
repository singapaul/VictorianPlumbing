import React, { Key, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchProducts, ApiResponse } from "./api/fetchProducts";
import { FormData, Product } from "./types/types";
import { FormProps } from "./components/Form";
import Filterbar from "./components/Filterbar";
import Form from "./components/Form";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    search: "toilets",
    option: 1,
    low: 0,
    high: 10000,
  });

  const handleFormSubmit: FormProps["handleSubmitForm"] = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function debounce(cb, delay = 800) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let timeout;
    return (...args) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  useEffect(() => {
    const onScroll = debounce(() => {
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
    });
    if (!isFetching) {
      document.addEventListener("scroll", onScroll);
    }

    return () => {
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
        <div className="flex flex-col md:flex-row">
          <Filterbar>
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
