import React , { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateProductRequest } from '../Service/Api';

const DialogUpdateProduct = ({ product, setProducts }) => {

    const { id, name, brand, price, stock, image_url } = product;

    const [open, setOpen] = React.useState(false);
    const [_name, setName] = useState(name);
    const [_brand, setBrand] = useState(brand);
    const [_price, setPrice] = useState(price);
    const [_stock, setStock] = useState(stock);
    const [_image_url, setImageUrl] = useState(image_url);
 
    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const updateProduct = () => {
      const productUpdated = { 
        name: _name,
        brand: _brand,
        price: _price,
        stock: _stock, 
        image_url: _image_url
      }

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
        <DialogTitle id="form-dialog-title">Producto a modificar</DialogTitle>
        <DialogContent>
          <TextField
            defaultValue={_name}
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            onChange= {(e) => setName(e.target.value)}
          /> 
            <TextField
            defaultValue={_brand}
            autoFocus
            margin="dense"
            id="brand"
            label="Marca"
            type="text"
            fullWidth
            onChange= {(e) => setBrand(e.target.value)}
          />
            <TextField
            defaultValue={_price}
            autoFocus
            margin="dense"
            id="price"
            label="Precio"
            type="number"
            fullWidth
            onChange= {(e) => setPrice(e.target.value)}
          />
            <TextField
            defaultValue={_stock}
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"
            type="number"
            fullWidth
            onChange= {(e) => setStock(e.target.value)}
          />
            <TextField
            defaultValue={_image_url}
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
            Cancelar
          </Button>
          <Button onClick={updateProduct} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

export default DialogUpdateProduct;
