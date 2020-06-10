import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteProductRequest } from '../Service/Api';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    button: {
      width: '217px'
    },
  }));

const DialogDeleteProduct = ( { idProduct, setProducts } ) => {
    
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const deleteProduct = () => {
        deleteProductRequest(idProduct)
        .then(data => {
            console.log(data);
            handleClose();
            setProducts(oldProducts => oldProducts.filter(product => product.id !== idProduct));
        })
        .catch(error => {
            console.log(error.message);
        })
    };

    return (
    <div>
        <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            className={classes.button}
            startIcon={<DeleteIcon />}
        >
            Eliminar
       </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea eliminar el producto?"}</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={deleteProduct} color="primary" autoFocus>
                Eliminar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}


export default DialogDeleteProduct;