import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Hidden } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { useState } from 'react';
import LocationMap from '../LocationMap';
import { useHereMapService } from '../../Service/HereMapService';
import { sendBuyerLocationRequest } from '../../Service/Api';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import '../../Styles/Location.css';

const UserLocationButton = ({ actualLocation }) => {
  const [ open, setOpen ] = useState(false);
  const { address } = actualLocation;
  const [ currentCoords, setCurrentCoords ] = useState();
  const { loading, fetchPositionsByCoords } = useHereMapService();
  const { setUser } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlerSendNewLocation = async (location) => {
    const userData = await sendBuyerLocationRequest(localStorage.id, location);
    setUser(userData);
    handleClose();
  }

  const getLocationByCoords = () => {
    const coords = { lat: currentCoords.latitude, lng: currentCoords.longitude };
    fetchPositionsByCoords(coords, handlerSendNewLocation);
  }

  return (
    <>
      <Button className="userNavigation" onClick={handleClickOpen}>
          <Hidden smDown>
            <LocationOnIcon />
          </Hidden>
          <Box textOverflow="ellipsis" className="address" overflow="hidden">
            { address }
          </Box>
        <ArrowDropDownIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="modal-container"
      >
        <DialogTitle className="modal-title" id="alert-dialog-title">
          Dirección de entrega
        </DialogTitle>
        <DialogContent className="modal-content">
          <DialogContentText className="modal-description" id="alert-dialog-description">
            Ubicacion actual: <br/>
            { address }
          </DialogContentText>
          <LocationMap currentCoords={actualLocation} setCurrentCoords={setCurrentCoords} />
        </DialogContent>
        <DialogActions>
          {loading && <div>Loading ....</div>}
          <Button onClick={handleClose} color="secondary">
            cancelar
          </Button>
          <Button
            onClick={getLocationByCoords}
            variant="contained"
            color="primary"
            className="accept-button"
            autoFocus>
            aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserLocationButton;