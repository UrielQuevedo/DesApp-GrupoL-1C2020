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
  const [ pagination, setPagination ] = useState({
    number: 1
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    setPagination({
      number: 1
    })
  }, [category])

  useEffect(() => {
    setLoading(true);
    if(category === 'offer') {
      Axios.get(`http://localhost:8080/api/stores/offers?${query}`)
        .then((r) => setStores(r.data))
        .catch((e) => console.log(e.response.data))
        .finally(_ => setLoading(false));
    } else {
      Axios.get(`http://localhost:8080/api/stores/filter?category=${category}&${query}&size=10&page=${pagination.number - 1}`)
        .then((r) => {
          setStores(r.data.content);
          setPagination({ number: r.data.number + 1, totalPages: r.data.totalPages })
        })
        .catch((e) => console.log(e.response.data))
        .finally(_ => setLoading(false));
    }
  }, [category, payment, search, pagination.number]);

  return (
    <Stores stores={stores} pagination={pagination} setPagination={setPagination} user={user} loading={loading} query={query} search={search} category={category} />
  );
}

export default StoresCategoriesView;