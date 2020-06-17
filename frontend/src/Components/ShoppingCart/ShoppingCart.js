import React from 'react';
import { Hidden } from '@material-ui/core';
import MobileShoppingCart from './MobileShoppingCart';
import DesktopShoppingCart from './DesktopShoppingCart';
import { useState } from 'react';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';

const ShoppingCart = () => {
  const { productsOrder, totalPrice } = useContext(ShoppingCartContext);
  const quantityOfProducts = productsOrder.length;

  const getStatusStyle = () => {
    if (totalPrice <= 1000) return "correct";
    if (totalPrice > 1000 && totalPrice <= 3000) return "alert";
    return "danger";
  }

  if(quantityOfProducts <= 0) return null;

  return (
    <>
      <Hidden smDown>
        <DesktopShoppingCart stateStyle={getStatusStyle()} totalPrice={totalPrice} totalAmount={quantityOfProducts}/>
      </Hidden>
      <Hidden mdUp>
        <MobileShoppingCart stateStyle={getStatusStyle()} totalPrice={totalPrice} totalAmount={quantityOfProducts}/>
      </Hidden>
    </>
  );
}

export default ShoppingCart;