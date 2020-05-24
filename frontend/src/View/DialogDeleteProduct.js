import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteProductRequest } from '../Service/Api';

const DialogDeleteProduct = ( { idStore, idProduct} ) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const deleteProduct = () => {
        deleteProductRequest(idStore, idProduct)
        .then(() => {
            window.location.reload();
            handleClose();
        })
        .catch(error => {
            console.log(error.message);
        })
    };

    return (
    <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
                Guardar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}


export default DialogDeleteProduct;