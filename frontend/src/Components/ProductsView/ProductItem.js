import React, { useContext, useState } from 'react';
import { Grow, Button, ButtonGroup, Dialog, DialogTitle, Typography, DialogActions, DialogContent, Grid, TextField } from '@material-ui/core';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import EditIcon from '@material-ui/icons/Edit';
import '../../Styles/ProductItem.css';
import { UserContext } from '../../Context/UserContext';
import { usePostProductToShoppingCart } from '../../Service/ShoppingCartService';
import { useEffect } from 'react';

const ProductItem = ({ product }) => {
  const { name, brand, price, id, storeId } = product;
  const { shoppingCart, setShoppingCart, setShoppingCartLoading } = useContext(ShoppingCartContext);
  const { user } = useContext(UserContext);
  const [ productToAdd, setProductToAdd ] = useState({ productId: id, totalPrice: price, quantity: 1 });
  const { postProductToShoppingCart, postProductToShoppingCartLoading } = usePostProductToShoppingCart(user.id, productToAdd);
  const [ open, setOpen ] = useState(false);
  const order = shoppingCart?.orders?.filter(o => o.storeId === storeId)[0];
  const orderProduct = order?.productOrders.filter(p => p.product.id === id)[0];

  useEffect(() => {
    if (orderProduct) setProductToAdd({ ...productToAdd, quantity: orderProduct.quantity, totalPrice: orderProduct.totalPrice })
  }, [setShoppingCartLoading])

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const isAdded = () => {
    return order?.productOrders.some(p => p.product.id === id);
  }

  const handleNewQuantity = (e) => {
    const newQuantity = e.target.value;
    setProductToAdd({...productToAdd, quantity: newQuantity, totalPrice: price * newQuantity});
  }

  const getTotalPriceOfShoppingCart = () => {
    return shoppingCart.totalPrice - (isAdded() ? orderProduct.totalPrice : 0);
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    postProductToShoppingCart(setShoppingCart);
    handleClose();
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
        <Button style={{ background:'#ffff', padding:'0' }} variant="contained">{orderProduct.quantity}</Button>
        <Button onClick={handleClickOpen} variant="contained" color="secondary" style={{ padding:'5px 0 5px 0' }}>
          <EditIcon style={{ transform:'scale(0.8)'}} />
        </Button>
      </ButtonGroup>
    );
  }

  const modalShop = () => {
    return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" style={{ textTransform:'capitalize' }} onClose={handleClose}>
          <Grid container justify="space-between">
            <h4 style={{ margin:'0' }}>{ name }</h4>
            <div>${price}</div>
          </Grid>
        </DialogTitle>
        <form onSubmit={handleAddProduct}>
          <DialogContent dividers>
            <Grid container direction="row">
              <Grid container item xs={6}>
                <img
                  src="https://via.placeholder.com/180"
                  style={{ borderRadius:'6px' }}
                  alt="imagen del store"
                />
              </Grid>
              <Grid container item xs={6} style={{ padding:'10px' }}>
                <TextField
                  style={{ width:'100%' }}
                  onChange={handleNewQuantity}
                  defaultValue={productToAdd.quantity}
                  type="number"
                  label="Cantidad"
                  required
                  inputProps={{ min: "1", max: "10", step: "1", pattern:"[0-9] * o\d * [0-9]" }}
                />
                <Grid container item direction="column">
                  <div> Su pedido quedaria en: </div>
                  <div> ${ getTotalPriceOfShoppingCart() + productToAdd.totalPrice } </div>
                </Grid>
              </Grid>
            </Grid>
            { isAdded() && <Button variant="outlined" color="secondary" style={{ marginTop:'20px' }}>
              Sacar de mi pedido
            </Button>}
          </DialogContent>
          <DialogActions>
            <Button color="secondary">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Agregar a mi pedido (${productToAdd.totalPrice})
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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
        {modalShop()}
        { isAdded() ? <ButtonToControl /> : <ButtonToAdd /> }
      </div>
    </Grow>
  );
}

export default ProductItem;