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
  const [ pagination, setPagination ] = useState({
    number: 1
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    Axios.get(`http://localhost:8080/api/stores/all?${query}&size=2&page=${pagination.number - 1}`)
      .then(r => {
        setStores(r.data.content)
        setPagination({ number: r.data.number + 1, totalPages: r.data.totalPages })
      })
      .finally(_ => setLoading(false));
  }, [search, payment, pagination.number]);

  return (
    <Stores stores={stores} pagination={pagination} setPagination={setPagination} user={user} loading={loading} query={query} search={search} />
  );
}

export default AllStoresView;