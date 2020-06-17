import React, { useContext, useState } from 'react';
import { Grow, Button, ButtonGroup } from '@material-ui/core';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../Styles/ProductItem.css';

const ProductItem = ({ product }) => {
  const { name, brand, price } = product;
  const { productsOrder, setProductsOrder, totalPrice, setTotalPrice } = useContext(ShoppingCartContext);
  const [ isAdded, setIsAdded ] = useState(false);
  const [ quantity, setQuantity ] = useState(0);

  const addToShoppingCart = () => {
    setProductsOrder([...productsOrder, product]);
    setTotalPrice(totalPrice + price);
    setQuantity(quantity + 1);
    setIsAdded(true);
  }

  const removeToShoppingCart = () => {
    setTotalPrice(totalPrice - price);
    setQuantity(quantity - 1);
    setIsAdded(true);
  }

  const ButtonToAdd = () => {
    return (
      <Button variant="contained" className="button-item-product" onClick={addToShoppingCart}>
        Agregar
      </Button>
    );
  }

  const ButtonToControl = () => {
    return (
      <ButtonGroup className="button-controler">
        {
          (quantity === 1) ?
            <Button variant="contained" color="secondary" style={{ padding:'0' }} ><DeleteIcon style={{ transform:'scale(0.8)', color:'#ffff' }}/></Button>
          :
            <Button variant="contained" color="secondary" onClick={removeToShoppingCart}>-</Button>
        }
        <Button style={{ background:'#ffff', padding:'0' }}>{quantity}</Button>
        <Button onClick={addToShoppingCart} variant="contained" color="secondary">+</Button>
      </ButtonGroup>
    );
  }

  return (
    <Grow in={true}>
      <div className="product-item-container">
        <div className="product-item-container-info">
          <img src="https://via.placeholder.com/180" style={{ borderRadius:'6px' }} alt="imagen del store"/>
          <div className="name">
            ${price}
          </div>
          <div className="address">
            {name}
          </div>
          <div className="sector">
            {brand}
          </div>
        </div>
        { isAdded ? <ButtonToControl /> : <ButtonToAdd /> }
      </div>
    </Grow>
  );
}

export default ProductItem;