import React from 'react';
import { Box, Badge } from '@material-ui/core';
import '../../Styles/ShoppingCart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';

const DesktopShoppingCart = ({ stateStyle, totalPrice, totalAmount }) => {
  // correct, alert, danger son estados del color del boton dependiendo de si supera lo establecido

  return (
    <Box className={`desktop-shopping-cart button ${stateStyle}`}  boxShadow={totalAmount}>
      <Badge badgeContent={3} className="shoppingCart">
        <ShoppingCartIcon style={{color:'#ffff'}} />
      </Badge>
      <span className="price">
        ${totalPrice}
      </span>
    </Box>
  );
}
DesktopShoppingCart.prototype = {
  stateStyle: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired
}

export default DesktopShoppingCart;