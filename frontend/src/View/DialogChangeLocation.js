import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import LocationMap from '../Components/LocationMap';
import LocationOn from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogChangeLocation = ({ actualCoords, setActualCoords }) => {

    const [ isLocationChangeView, setIsLocationChangeView ] = useState(false);
   
    const handlerIsChangeLocation = () => {
        setIsLocationChangeView(true);
    }

    const handleClose = () => {
        setIsLocationChangeView(false);
    }
    
    return (
        <div> 
            <Button className="location-button" onClick={handlerIsChangeLocation} >
                <LocationOn style={{ position: 'absolute', left: '0' }}/>
                <Box textOverflow="ellipsis" overflow="hidden" className="location-address" >
                    Dirección
                </Box>
                    <ArrowDropDownIcon style={{ position: 'absolute', right: '0' }}/>
            </Button>
            <Dialog open={isLocationChangeView} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dirección de tienda</DialogTitle>
                <DialogContent>
                    <LocationMap currentCoords={actualCoords} setCurrentCoords={setActualCoords} />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button type="submit" color="primary">
                    Guardar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogChangeLocation;