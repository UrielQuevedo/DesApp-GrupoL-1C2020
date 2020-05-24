import React from 'react';
import { Button, Badge } from '@material-ui/core';
import '../../Styles/ShoppingCart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
          ${totalPrice}
        </span>
      </Button>
    </div>
  );
}

export default MobileShoppingCart;