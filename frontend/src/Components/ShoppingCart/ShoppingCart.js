import React from 'react';
import { Hidden } from '@material-ui/core';
import MobileShoppingCart from './MobileShoppingCart';
import DesktopShoppingCart from './DesktopShoppingCart';
import { useState } from 'react';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';

const ShoppingCart = () => {
  const { shoppingCart, getShoppingCartLoading } = useContext(ShoppingCartContext);

  const getStatusStyle = () => {
    if (shoppingCart.totalPrice <= 1000) return "correct";
    if (shoppingCart.totalPrice > 1000 && shoppingCart.totalPrice <= 3000) return "alert";
    return "danger";
  }

  if(getShoppingCartLoading) return null;
  if(shoppingCart.totalQuantity <= 0) return null;

  return (
    <>
      <Hidden smDown>
        <DesktopShoppingCart stateStyle={getStatusStyle()} totalPrice={shoppingCart.totalPrice} totalAmount={shoppingCart.totalQuantity}/>
      </Hidden>
      <Hidden mdUp>
        <MobileShoppingCart stateStyle={getStatusStyle()} totalPrice={shoppingCart.totalPrice} totalAmount={shoppingCart.totalQuantity}/>
      </Hidden>
    </>
  );
}

export default ShoppingCart;