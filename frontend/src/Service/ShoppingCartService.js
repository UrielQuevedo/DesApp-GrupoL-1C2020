/* eslint-disable react-hooks/exhaustive-deps */
import { useGet, usePost } from "./HTTPService";
import { useEffect, useState } from "react";
const pathname = '/users';

export const useGetShoppingCart = (id) => {
  const [shoppingCart, setShoppingCart] = useState({});
  const { method, loading: getShoppingCartLoading } = useGet(`${pathname}/${id}/shoppingcart`);

  useEffect(() => {
    method(setShoppingCart);
  }, []);

  return { shoppingCart, setShoppingCart, getShoppingCartLoading };
}

export const usePostProductToShoppingCart = (id, product) => {
  const { method: postProductToShoppingCart, loading: postProductToShoppingCartLoading } = usePost(`${pathname}/${id}/shoppingcart/product`, product);
  return { postProductToShoppingCart, postProductToShoppingCartLoading };
}