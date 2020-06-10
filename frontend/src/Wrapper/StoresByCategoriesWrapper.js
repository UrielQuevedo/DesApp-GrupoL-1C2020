import React from 'react';
import { useParams } from 'react-router';
import { useGetStoresBySectorFiltered } from '../Service/StoreService';
import Stores from '../View/Stores';

const StoresCategoriesWrapper = () => {
  const { category } = useParams();
  const { storesLoading, stores, totalPages, filter, setFilter } = useGetStoresBySectorFiltered(category);

  return (
    <Stores
      stores={stores}
      storesLoading={storesLoading}
      totalPages={totalPages}
      filter={filter}
      setFilter={setFilter}
    />
  );
}

export default StoresCategoriesWrapper;