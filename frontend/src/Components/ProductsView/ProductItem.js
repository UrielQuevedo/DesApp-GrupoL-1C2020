import React, { useContext, useState } from 'react';
import { Grow, Button, ButtonGroup, Dialog, DialogTitle, Typography, DialogActions, DialogContent, Grid, TextField } from '@material-ui/core';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import EditIcon from '@material-ui/icons/Edit';
import '../../Styles/ProductItem.css';

const ProductItem = ({ product }) => {
  const { name, brand, price } = product;
  const { productsOrder, setProductsOrder, totalPrice, setTotalPrice } = useContext(ShoppingCartContext);
  const [ isAdded, setIsAdded ] = useState(false);
  const [ quantity, setQuantity ] = useState(1);
  const [ open, setOpen ] = useState(false);

  const addToShoppingCart = () => {
    setProductsOrder([...productsOrder, product]);
    setTotalPrice(totalPrice + price);
    setQuantity(quantity + 1);
    setIsAdded(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleNewQuantity = (e) => {
    setQuantity(e.target.value);
  }

  const ButtonToAdd = () => {
    return (
      <Button variant="contained" className="button-item-product" onClick={handleClickOpen}>
        Agregar
      </Button>
    );
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProductsOrder([...productsOrder, product]);
    setTotalPrice(totalPrice + price * quantity);
    setIsAdded(true);
    handleClose();
  }

  const ButtonToControl = () => {
    return (
      <ButtonGroup className="button-controler">
        <Button style={{ background:'#ffff', padding:'0' }} variant="contained">{quantity}</Button>
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
                  defaultValue={1}
                  type="number"
                  label="Cantidad"
                  required
                  inputProps={{ min: "1", max: "10", step: "1", pattern:"[0-9] * o\d * [0-9]" }}
                />
                <Grid container item direction="column">
                  <div> Su pedido quedaria en: </div>
                  <div> ${ totalPrice + price * quantity } </div>
                </Grid>
              </Grid>
            </Grid>
            { isAdded && <Button variant="outlined" color="secondary" style={{ marginTop:'20px' }}>
              Sacar de mi pedido
            </Button>}
          </DialogContent>
          <DialogActions>
            <Button color="secondary">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Agregar a mi pedido (${price * quantity})
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
        { isAdded ? <ButtonToControl /> : <ButtonToAdd /> }
      </div>
    </Grow>
  );
}

export default ProductItem;