import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import Products from '../View/Products';
import Axios from 'axios';

const ProductWrapper = () => {
  const [ categories, setCategories ] = useState([]);
  const query = new URLSearchParams(window.location.search);
  const search = query.get('search');
  const filter = query.get('filter');
  const { store_id, category } = useParams();
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ categoriesLoading, setCategoriesLoading ] = useState(true);
  const [ storeLoading, setStoreLoading ] = useState(true);
  const [ store, setStore ] = useState({});

  useEffect(() => {
    if (category) {
      setLoading(true);
      Axios.get(`http://localhost:8080/api/stores/${store_id}/products/${category}/filter?sort=price,asc`)
        .then((response) => setProducts(response.data.content))
        .catch((error) => console.log(error.response))
        .finally( _ => setLoading(false));
    }
  }, [category, store_id, search, filter]);

  useEffect(() => {
    setCategoriesLoading(true);
    setStoreLoading(true);
    Axios.get(`http://localhost:8080/api/stores/${store_id}/products/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error.response))
      .finally( _ => setCategoriesLoading(false));
    Axios.get(`http://localhost:8080/api/stores/${store_id}`)
      .then((response) => setStore(response.data))
      .catch((error) => console.log(error.response));
  }, [store_id]);

  if (!category && !categoriesLoading) return <Redirect to={`/stores/${store_id}/products/${categories[0]}`} />

  return (
    <Products store={store} categories={categories} products={products} loading={loading} query={query} />
  );
}

export default ProductWrapper;