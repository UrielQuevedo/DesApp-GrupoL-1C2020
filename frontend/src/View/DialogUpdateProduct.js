import React , { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogUpdateProduct = ({ product }) => {

    const { id, name, brand, price, stock, image_url } = product;

    const [open, setOpen] = React.useState(false);
   /* const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image_url, setImageUrl] = useState('');
 */
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={ {marginTop:'10px', marginBottom:'10px', width:'217px'}}>
        Modificar
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Producto a modificar</DialogTitle>
        <DialogContent>
          <TextField
            defaultValue={name}
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
          //  onChange= {(e) => setName(e.target.value)}
          /> 
            <TextField
            defaultValue={brand}
            autoFocus
            margin="dense"
            id="brand"
            label="Marca"
            type="text"
            fullWidth
         //   onChange= {(e) => setBrand(e.target.value)}
          />
            <TextField
            defaultValue={price}
            autoFocus
            margin="dense"
            id="price"
            label="Precio"
            type="number"
            fullWidth
         //   onChange= {(e) => setPrice(e.target.value)}
          />
            <TextField
            defaultValue={stock}
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"
            type="number"
            fullWidth
          //  onChange= {(e) => setStock(e.target.value)}
          />
            <TextField
            defaultValue={image_url}
            autoFocus
            margin="dense"
            id="image_url"
            label="URL de imagen"
            type="text"
            fullWidth
            //onChange= {(e) => setImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

export default DialogUpdateProduct;
