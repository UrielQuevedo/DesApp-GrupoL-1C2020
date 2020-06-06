import React , { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateProductRequest } from '../Service/Api';
import { useForm } from 'react-hook-form';

const DialogUpdateProduct = ({ product, setProducts }) => {

    const { id, name, brand, price, stock, image_url } = product;

    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit } = useForm();
 
    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const updateProduct = (productUpdated, e) => {
       updateProductRequest(id, productUpdated)
        .then(data => {
          console.log(data);
          handleClose();
          setProducts(oldProducts => {
            let productsUpdated = [];
            oldProducts.forEach(product => productsUpdated.push(product));
            let oldProduct = productsUpdated.find(product => product.id === data.id);
            oldProduct.name = data.name;
            oldProduct.brand = data.brand;
            oldProduct.stock = data.stock;
            oldProduct.price = data.price;
            oldProduct.image_url = data.image_url;
            e.target.reset()
            return productsUpdated;
          })
        })
        .catch(error => console.log(error));
    }

    return (
        <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} style={ {marginTop:'10px', marginBottom:'10px', width:'217px'}}>
        Modificar
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(updateProduct)}>
        <DialogTitle id="form-dialog-title">Producto a modificar</DialogTitle>
        <DialogContent>
          <TextField
            defaultValue={name}
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
            defaultValue={brand}
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
            defaultValue={price}
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
            defaultValue={stock}
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
            defaultValue={image_url}
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
    )
}

export default DialogUpdateProduct;
