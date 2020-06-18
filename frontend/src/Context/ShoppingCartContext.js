import React, { createContext } from 'react';
import ShoppingCart from '../Components/ShoppingCart/ShoppingCart';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { useGetShoppingCart } from '../Service/ShoppingCartService';

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {

  const { user } = useContext(UserContext);
  const { shoppingCart, setShoppingCart, getShoppingCartLoading } = useGetShoppingCart(user.id);

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        getShoppingCartLoading
    }}>
      <ShoppingCart />
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;