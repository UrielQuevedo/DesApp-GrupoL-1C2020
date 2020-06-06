import React, { useContext, useState } from 'react';
import Stores from '../../View/Stores';
import { useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import Axios from 'axios';

const AllStoresView = () => {
  const query = new URLSearchParams(window.location.search);
  const search = query.get('search');
  const payment = query.get('payment');
  const [ stores, setStores ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    Axios.get(`http://localhost:8080/api/stores/all?${query}`)
      .then(r => setStores(r.data));
    setLoading(false);
  }, [search, payment]);

  return (
    <Stores stores={stores} user={user} loading={loading} query={query} search={search} />
  );
}

export default AllStoresView;