/* eslint-disable react-hooks/exhaustive-deps */
import { useGet } from "./HTTPService"
import { useState } from "react";
import { useEffect } from "react";

export const useGetCategories = (store_id) => {
  const [ categories, setCategories ] = useState([]);
  const { method, loading: categoriesLoading } = useGet(`/stores/${store_id}/products/categories`);

  useEffect(() => {
    method(setCategories);
  }, [store_id])

  return { categoriesLoading, categories };
}

export const useGetStore = (store_id) => {
  const [ store, setStore ] = useState({});
  const { method, loading: storeLoading } = useGet(`/stores/${store_id}`);

  useEffect(() => {
    method(setStore);
  }, [store_id])

  return { storeLoading, store };
}