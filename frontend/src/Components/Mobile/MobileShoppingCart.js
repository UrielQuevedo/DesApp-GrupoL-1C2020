import React from 'react';
import { AppBar, Toolbar, Button, Badge } from '@material-ui/core';
import '../../Styles/ShoppingCart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const MobileShoppingCart = () => {
  return (
    <div className="mobile-shopping-cart">
      <Button variant="contained" size="large" className="correct">
        <Badge badgeContent={3} className="shoppingCart">
          <ShoppingCartIcon style={{color:'#ffff'}} />
        </Badge>
        <span>
          ver mi pedido
        </span>
        <span className="price">
          $10.000
        </span>
      </Button>
    </div>
  );
}

export default MobileShoppingCart;