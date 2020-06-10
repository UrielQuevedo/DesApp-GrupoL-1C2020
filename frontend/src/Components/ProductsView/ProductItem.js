import React from 'react';
import { Fade } from '@material-ui/core';

const ProductItem = ({ product }) => {
  const { name, brand, price } = product;
  return (
    <Fade in={true}>
      <div className="store-item-container">
        <img src="https://via.placeholder.com/180" style={{ borderRadius:'6px' }} alt="imagen del store"/>
        <div className="name">
          {price},00$
        </div>
        <div className="address">
          {name}
        </div>
        <div className="sector">
          {brand}
        </div>
      </div>
    </Fade>
  );
}

export default ProductItem;