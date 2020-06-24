import axios from 'axios';
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_BACKEND + '/api';

const useApi = (axiosFunction) => {
  const [loading, setLoading] = useState(false);

  const method = (nextFunction, handlerErrorFunction = () => null) => {
    setLoading(true);
    axiosFunction()
      .then((response) => nextFunction(response.data))
      .catch((error) => {
        console.log(error.response);
        handlerErrorFunction(error.response);
      })
      .finally(() => setLoading(false));
  }

  return { loading, method };
}

export const useGet = (url, queryParams = {}) => {
  return useApi(() => axios.get(API_URL + url, { params: queryParams }));
}

export const usePost = (url, body) => {
  return useApi(() => axios.post(API_URL + url, body));
}

export const useDelete = (url, body) => {
  return useApi(() => axios.delete(API_URL + url, { data: body }));
}
