/* eslint-disable react-hooks/exhaustive-deps */
import { useGet } from "./HTTPService";
import { useState, useEffect } from "react";

export const useGetAllProducts = (store_id) => {
  const [ products, setProducts ] = useState([]);
  const { method, loading: getProductsLoading } = useGet(`/stores/${store_id}/products`);

  const getProducts = () => {
    method(setProducts);
  }

  return { getProducts, getProductsLoading, products };
}

export const useGetProductsFiltered = (store_id, category) => {
  const [ products, setProducts ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ filter, setFilter ] = useState({
    search: '',
    size: 10,
    page: 0,
    sort: 'price,desc',
  });
  const { method, loading: productsLoading } = useGet(`/stores/${store_id}/products/${category}/filter`, filter);

  const setContent = (data) => {
    setProducts(data.content);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    method(setContent);
  }, [store_id, category, filter])

  return { productsLoading, products, setFilter, filter, totalPages };
}

