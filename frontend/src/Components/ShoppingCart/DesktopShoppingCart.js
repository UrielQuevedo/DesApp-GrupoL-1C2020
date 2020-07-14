import React from 'react';
import { Box, Badge } from '@material-ui/core';
import '../../Styles/ShoppingCart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import formatPrice from '../../Utils/Formatters/FormatPrice';

const DesktopShoppingCart = ({ stateStyle, totalPrice, totalAmount }) => {
  // correct, alert, danger son estados del color del boton dependiendo de si supera lo establecido
  const { push } = useHistory();

  return (
    <Box className={`desktop-shopping-cart button ${stateStyle}`} onClick={() => push('/profile/shoppingcart')}>
      <Badge badgeContent={totalAmount} className="shoppingCart">
        <ShoppingCartIcon />
      </Badge>
      <span className="price">
        {formatPrice(totalPrice)}
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