/* eslint-disable react-hooks/exhaustive-deps */
import { useGet, usePost, useDelete } from "./HTTPService";
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

export const useDeleteProductToShoppingCart = (id) => {
  const [ productToRemove, setProductToRemove ] = useState();
  const { method, loading: removeProductToShoppingCartLoading } = useDelete(`${pathname}/${id}/shoppingcart/product`, productToRemove);

  const removeProductToShoppingCart = (functionSetShoppingCart) => {
    method((shoppingCart) => functionSetShoppingCart(shoppingCart));
  }

  return { removeProductToShoppingCart, removeProductToShoppingCartLoading, setProductToRemove };
}

export const useMakePuchase = (id) => {
  const [ values, setValues ] = useState({});
  const { method, loading: makeAPurchaseLoading } = usePost(`${pathname}/${id}/shoppingcart/purchase`, values);

  const makeAPurchase = (setStep, setShoppingCart) => {
    method((data) => { setShoppingCart(data); setStep(3) }, setStep(4));
  }

  return { makeAPurchase, makeAPurchaseLoading, values, setValues };
}
