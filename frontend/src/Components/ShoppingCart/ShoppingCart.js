import React from 'react';
import { Hidden } from '@material-ui/core';
import MobileShoppingCart from './MobileShoppingCart';
import DesktopShoppingCart from './DesktopShoppingCart';
import { useState } from 'react';

const ShoppingCart = () => {
  const [stateStyle, setStatusStyle] = useState('correct');

  return (
    <>
      <Hidden smDown>
        <DesktopShoppingCart stateStyle={stateStyle} totalPrice={'10.000'} totalAmount={3}/>
      </Hidden>
      <Hidden mdUp>
        <MobileShoppingCart stateStyle={stateStyle} totalPrice={'10.000'} totalAmount={3}/>
      </Hidden>
    </>
  );
}

export default ShoppingCart;