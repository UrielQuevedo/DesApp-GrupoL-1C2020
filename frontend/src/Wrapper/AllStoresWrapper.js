import React from 'react';
import { useGetAllStoresFiltered } from '../Service/StoreService';
import Stores from '../View/Stores';

const AllStoresWrapper = () => {
  const { storesLoading, stores, totalPages, filter, setFilter } = useGetAllStoresFiltered();

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

export default AllStoresWrapper;