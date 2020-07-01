import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UploadFileCSV from './UploadFileCSV';
import UploadFileCSVAdd from './UploadFileCSVAdd';

const DialogUploadFile = ({ idStore, text, setProducts, isUpdate }) => {

    const [ open, setOpen ] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button
            variant="contained"
            color="default"
            onClick={handleOpen}
            startIcon={<CloudUploadIcon />}
            style={{ top: '20px' }}
            >
            { text }
            </Button>
            <div>
            <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                     { isUpdate ?
                         <UploadFileCSV close={handleClose} setProducts={setProducts} /> :
                         <UploadFileCSVAdd idStore={idStore} close={handleClose} setProducts={setProducts} /> 
                     }
                </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
        </div>
    )
}

export default DialogUploadFile;