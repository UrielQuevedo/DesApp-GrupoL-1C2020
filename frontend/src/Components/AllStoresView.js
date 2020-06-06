import React, { useContext, useState } from 'react';
import Stores from '../View/Stores';
import { useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import Axios from 'axios';

const AllStoresView = () => {
  const query = new URLSearchParams(window.location.search);
  const search = query.get('search');
  const [ stores, setStores ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    if(!search || search === ' ') {
      Axios.get('http://localhost:8080/api/stores')
        .then(r => setStores(r.data))
    } else {
      Axios.get('http://localhost:8080/api/stores/filter/' + search)
      .then(r => setStores(r.data));
    }
    setLoading(false);
  }, [search]);

  return (
    <Stores stores={stores} user={user} loading={loading} />
  );
}

export default AllStoresView;