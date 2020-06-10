import React from 'react';
import { Redirect, useParams } from 'react-router';
import { useGetCategories } from '../Service/StoreService';

const ProductWrapper = () => {
  const { store_id } = useParams();
  const { categoriesLoading, categories } = useGetCategories(store_id);

  if (!categoriesLoading) return <Redirect to={`/stores/${store_id}/products/${categories[0]}`} />

  return (
    <div style={{ marginTop:'4.5rem', display:'flex' }}>
      LOADING...
    </div>
  );
}

export default ProductWrapper;