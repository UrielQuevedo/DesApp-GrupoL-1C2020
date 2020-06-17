import React, { createContext } from 'react';
import ShoppingCart from '../Components/ShoppingCart/ShoppingCart';
import { useState } from 'react';

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {

  const [ productsOrder, setProductsOrder ] = useState([]);
  const [ totalPrice, setTotalPrice ] = useState(0);

  return (
    <ShoppingCartContext.Provider
      value={{ productsOrder: productsOrder,
      setProductsOrder: setProductsOrder,
      totalPrice: totalPrice,
      setTotalPrice: setTotalPrice
    }}>
      <ShoppingCart />
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;