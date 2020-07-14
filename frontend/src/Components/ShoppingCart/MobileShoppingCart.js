import React from 'react';
import { Button, Badge } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../Styles/ShoppingCart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import formatPrice from '../../Utils/Formatters/FormatPrice';

const MobileShoppingCart = ({ stateStyle, totalPrice, totalAmount }) => {
  return (
    <div className="mobile-shopping-cart">
      <Button variant="contained" size="large" className={stateStyle}>
        <Badge badgeContent={totalAmount} className="shoppingCart">
          <ShoppingCartIcon style={{color:'#ffff'}} />
        </Badge>
        <span>
          ver mi pedido
        </span>
        <span className="price">
          {formatPrice(totalPrice)}
        </span>
      </Button>
    </div>
  );
}
MobileShoppingCart.prototype = {
  stateStyle: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired
}

export default MobileShoppingCart;