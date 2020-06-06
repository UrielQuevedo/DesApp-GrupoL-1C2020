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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const DialogAddProduct = ( { setProducts }) => {
  
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [category, setCategory] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  const addProduct = (product, e) => {
      console.log(product);
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
          <FormControl fullWidth>
            <InputLabel id="select-category">Categoria</InputLabel>
            <Select
              required
              labelId="select-category"
              id="category"
              value={category}
              onChange={handleChange}
              >
              <MenuItem value={10}>BEBIDAS</MenuItem>
              <MenuItem value={20}>GALLETITAS</MenuItem>
              <MenuItem value={30}>FIAMBRE</MenuItem>
              <MenuItem value={40}>FIDEOS</MenuItem>
            </Select>
            </FormControl>
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