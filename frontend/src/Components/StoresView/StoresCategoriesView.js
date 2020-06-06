import React, { useContext, useState } from 'react';
import Stores from '../../View/Stores';
import { useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import Axios from 'axios';
import { useParams } from 'react-router';

const StoresCategoriesView = () => {
  const query = new URLSearchParams(window.location.search.slice(1));
  const { category } = useParams();
  const payment = query.get('payment');
  const search = query.get('search');
  const [ stores, setStores ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    Axios.get(`http://localhost:8080/api/stores/filter?category=${category}&${query}`)
      .then((r) => setStores(r.data))
      .catch((e) => console.log(e.response.data));
    setLoading(false);
  }, [category, payment, search]);

  return (
    <Stores stores={stores} user={user} loading={loading} query={query} search={search} category={category} />
  );
}

export default StoresCategoriesView;