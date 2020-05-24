import React from 'react';
import { Box, Badge } from '@material-ui/core';
import '../../Styles/ShoppingCart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useState } from 'react';

const DesktopShoppingCart = ({ stateStyle, totalPrice, totalAmount }) => {
  // correct, alert, danger son estados del color del boton dependiendo de si supera lo establecido

  return (
    <Box className={`desktop-shopping-cart button ${stateStyle}`}  boxShadow={totalAmount}>
      <Badge badgeContent={3} className="shoppingCart">
        <ShoppingCartIcon style={{color:'#ffff'}} />
      </Badge>
      <p className="price">${totalPrice}</p>
    </Box>
  );
}

export default DesktopShoppingCart;