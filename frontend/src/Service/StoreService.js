/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGet } from "./HTTPService";

export const useGetCategories = (store_id) => {
  const [ categories, setCategories ] = useState([]);
  const { method, loading: categoriesLoading } = useGet(`/stores/${store_id}/categories`);

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

const useGetStoresFiltered = (url, category = null) => {
  const [ stores, setStores ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ filter, setFilter ] = useState({
    search: '',
    size: 10,
    page: 0,
    payment: null
  });
  const [ storesLoading, setStoresLoading ] = useState(true);
  const { method: getStores } = useGet(url, filter);
  const { method: getOffers } = useGet('/stores/offers', filter);

  const setContent = (data) => {
    setStores(data.content);
    setTotalPages(data.totalPages);
    setStoresLoading(false);
  }

  useEffect(() => {
    setStoresLoading(true);
    if (category === 'offer') {
      getOffers(setContent);
    } else {
      getStores(setContent);
    }
  }, [filter, category]);

  return { storesLoading, stores, totalPages, filter, setFilter };
}


export const useGetAllStoresFiltered = () => {
  return useGetStoresFiltered('/stores/all');
}

export const useGetStoresBySectorFiltered = (category) => {
  return useGetStoresFiltered(`/stores?category=${category}`, category);
}