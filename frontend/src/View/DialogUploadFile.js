import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UploadFileCSV from './UploadFileCSV';

const DialogUploadFile = ({ setProducts }) => {

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
            Modificar productos
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
                    <UploadFileCSV close={handleClose} setProducts={setProducts} />
                </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
        </div>
    )
}

export default DialogUploadFile;