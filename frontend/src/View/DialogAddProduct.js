import React , { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addProductRequest } from '../Service/Api';

const DialogAddProduct = ( { setProducts }) => {
  
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image_url, setImageUrl] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addProduct = () => {
    const product = { name, brand, price, stock, image_url }
    addProductRequest(2, product)
    .then(data => {
          console.log(data);
          handleClose();
          setProducts(oldProducts => {
          let productsUpdated = [];
          oldProducts.forEach(product => {
              productsUpdated.push(product);
          });
          productsUpdated.push(data);
          return productsUpdated;
        });
     })
    .catch(error => console.log(error));
   };

  return (
    <div>
      {console.log("dialogAddProduct")}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Agregar producto
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Producto a agregar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            onChange= {(e) => setName(e.target.value)}
          /> 
            <TextField
            autoFocus
            margin="dense"
            id="brand"
            label="Marca"
            type="text"
            fullWidth
            onChange= {(e) => setBrand(e.target.value)}
          />
            <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Precio"
            type="number"
            fullWidth
            onChange= {(e) => setPrice(e.target.value)}
          />
            <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="stock"
            type="number"
            fullWidth
            onChange= {(e) => setStock(e.target.value)}
          />
            <TextField
            autoFocus
            margin="dense"
            id="image_url"
            label="URL de imagen"
            type="text"
            fullWidth
            onChange= {(e) => setImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addProduct} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogAddProduct;