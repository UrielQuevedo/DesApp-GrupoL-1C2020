import React, { useContext, useState } from 'react';
import Stores from '../View/Stores';
import { useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import Axios from 'axios';
import { useParams } from 'react-router';

const StoresCategoriesView = () => {
  const query = new URLSearchParams(window.location.search);
  const { category } = useParams();
  const filter = query.get('filter');
  const search = query.get('search');
  const [ stores, setStores ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    // Axios.get(`http://localhost:8080/api/stores?search=${search}&filter=${filter}&category=${category}`)
    //   .then(r => setStores(r.data));
    console.log(filter, search, category);
    setLoading(false);
  }, [filter, search, category]);

  return (
    <Stores stores={stores} user={user} loading={loading} />
  );
}

export default StoresCategoriesView;