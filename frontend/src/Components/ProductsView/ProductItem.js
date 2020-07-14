import { Button, ButtonGroup, Grow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import '../../Styles/ProductItem.css';
import BuyModal from './BuyModal';
import formatPrice from '../../Utils/Formatters/FormatPrice';

const ProductItem = ({ product }) => {
  const { name, brand, price, id, storeId } = product;
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [ open, setOpen ] = useState(false);

  const order = shoppingCart?.orders?.filter(o => o.storeId === storeId)[0];
  const productOrder = order?.productOrders.filter(p => p.product.id === id)[0];

  const handleClickOpen = () => {
    setOpen(true);
  }

  const isAdded = () => {
    return order?.productOrders.some(p => p.product.id === id);
  }

  const getTotalPriceOfShoppingCart = () => {
    return shoppingCart.totalPrice - (isAdded() ? productOrder.totalPrice : 0);
  }

  const ButtonToAdd = () => {
    return (
      <Button variant="contained" className="button-item-product" onClick={handleClickOpen}>
        Agregar
      </Button>
    );
  }

  const ButtonToControl = () => {
    return (
      <ButtonGroup className="button-controler">
        <Button style={{ background:'#ffff', padding:'0' }} variant="contained">
          {productOrder.quantity}
        </Button>
        <Button onClick={handleClickOpen} variant="contained" color="secondary" style={{ padding:'5px 0 5px 0' }}>
          <EditIcon style={{ transform:'scale(0.8)'}} />
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <Grow in={true}>
      <div className="product-item-container">
        <div className="product-item-container-info">
          <img src="https://via.placeholder.com/180" style={{ borderRadius:'6px' }} alt="imagen del store"/>
          <div className="name">
            {formatPrice(price)}
          </div>
          <div className="address">
            {name}
          </div>
          <div className="sector">
            {brand}
          </div>
        </div>
        <BuyModal
          actualPriceShoppingCart={getTotalPriceOfShoppingCart()}
          product={product}
          isOpen={open}
          setOpen={setOpen}
          isAdded={isAdded()}
          orderId={order}
          productOrder={productOrder}
        />
        { isAdded() ? <ButtonToControl /> : <ButtonToAdd /> }
      </div>
    </Grow>
  );
}

export default ProductItem;