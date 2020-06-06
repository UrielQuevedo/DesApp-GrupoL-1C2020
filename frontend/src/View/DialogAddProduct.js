import React , { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const addProduct = (product, e) => {
      addProductRequest(3, product)
      .then(data => {
            console.log(data);
            handleClose();
            setProducts(oldProducts => {
            let productsUpdated = [];
            oldProducts.forEach(product => {
                productsUpdated.push(product);
            });
            productsUpdated.push(data);
            e.target.reset()
            return productsUpdated;
          });
        })
       .catch(error => console.log(error));
  } 

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Agregar producto
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(addProduct)}>
        <DialogTitle id="form-dialog-title">Producto a agregar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            required
            id="name"
            label="Nombre"
            type="text"
            name="name"
            fullWidth
            inputRef={register}
          /> 
            <TextField
            autoFocus
            margin="dense"
            required
            id="brand"
            label="Marca"
            type="text"
            name="brand"
            fullWidth
            inputRef={register}        
          />
            <TextField
            autoFocus
            margin="dense"
            required
            id="price"
            label="Precio"
            type="number"
            name="price"
            fullWidth
            inputRef={register}
          />
            <TextField
            autoFocus
            margin="dense"
            id="stock"
            required
            label="Stock"
            type="number"
            name="stock"
            fullWidth
            inputRef={register}
          />
            <TextField
            autoFocus
            margin="dense"
            id="image_url"
            required
            label="URL de imagen"
            type="text"
            name="image_url"
            fullWidth
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Guardar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default DialogAddProduct;