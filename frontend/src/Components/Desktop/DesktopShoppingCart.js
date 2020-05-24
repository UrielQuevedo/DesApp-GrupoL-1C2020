import React from 'react';
import { Box, Badge } from '@material-ui/core';
import '../../Styles/ShoppingCart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useState } from 'react';

const DesktopShoppingCart = () => {
  // correct, alert, danger son estados del color del boton dependiendo de si supera lo establecido
  const [state, setstate] = useState("correct");

  return (
    <Box className="desktop-shopping-cart" className={"button " + state} boxShadow={3}>
      <Badge badgeContent={3} className="shoppingCart">
        <ShoppingCartIcon style={{color:'#ffff'}} />
      </Badge>
      <p className="price">10000 $</p>
    </Box>
  );
}

export default DesktopShoppingCart;