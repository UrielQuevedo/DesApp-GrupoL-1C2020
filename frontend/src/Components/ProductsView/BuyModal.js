/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import { UserContext } from '../../Context/UserContext';
import { useDeleteProductToShoppingCart, usePostProductToShoppingCart } from '../../Service/ShoppingCartService';
import '../../Styles/ProductItem.css';

const BuyModal = ({ actualPriceShoppingCart, productOrder, orderId, product, isOpen, setOpen, isAdded }) => {
  const [ newProduct, setNewProduct ] = useState({
    productId: product.id,
    quantity: productOrder?.quantity ?? 1,
    totalPrice: product.price,
  });
  const { user } = useContext(UserContext);
  const { setShoppingCart } = useContext(ShoppingCartContext);
  const { postProductToShoppingCart } = usePostProductToShoppingCart(user.id, newProduct);
  const { removeProductToShoppingCart, setProductToRemove } = useDeleteProductToShoppingCart(user.id);

  useEffect(() => {
    if (isAdded) {
      setProductToRemove({
        orderId: orderId?.id,
        productOrderId: productOrder?.id,
      });
    }
  }, [isAdded])

  const handleClose = () => {
    setOpen(false);
  }

  const handleCancel = () => {
    setNewProduct({ ...newProduct, quantity: 1, totalPrice: product.price })
    handleClose();
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    postProductToShoppingCart(setShoppingCart);
    handleClose();
  }

  const handleNewQuantity = (e) => {
    const newQuantity = e.target.value;
    setNewProduct({...newProduct, quantity: newQuantity, totalPrice: product.price * newQuantity});
  }

  const removeProduct = () => {
    removeProductToShoppingCart(setShoppingCart);
    handleClose();
  }

  return (
    <Dialog onClose={handleCancel} aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle id="customized-dialog-title" style={{ textTransform:'capitalize' }}>
        <Grid container justify="space-between">
          <h4 style={{ margin:'0' }}>{ product.name }</h4>
          <div>${product.price}</div>
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
                defaultValue={newProduct.quantity}
                type="number"
                label="Cantidad"
                required
                inputProps={{ min: "1", max: product.stock, step: "1", pattern:"[0-9] * o\d * [0-9]" }}
              />
              <Grid container item direction="column">
                <div>
                  Su pedido quedaria en:
                </div>
                <div>
                  ${ actualPriceShoppingCart + newProduct.totalPrice }
                </div>
              </Grid>
            </Grid>
          </Grid>
          { isAdded &&
            <Button variant="outlined" color="secondary" onClick={removeProduct} style={{ marginTop:'20px' }}>
              Sacar de mi pedido
            </Button>
          }
        </DialogContent>
        <DialogActions>
          <Button type="reset" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Agregar a mi pedido (${newProduct.totalPrice})
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BuyModal;