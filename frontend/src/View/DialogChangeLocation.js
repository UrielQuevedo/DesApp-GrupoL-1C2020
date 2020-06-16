import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box, Grid, CircularProgress } from '@material-ui/core';
import LocationMap from '../Components/LocationMap';
import LocationOn from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHereMapService } from '../Service/HereMapService';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import '../Styles/Location.css';
import '../Styles/PublishStore.css';

const DialogChangeLocation = ({ actualCoords, setActualCoords, location, setLocation }) => {

    const [ isLocationChangeView, setIsLocationChangeView ] = useState(false);
    const { loading, fetchPositionsByCoords } = useHereMapService();

    const handlerIsChangeLocation = () => {
        setIsLocationChangeView(true);
    }

    const handlerChangeLocation = (location) => {
        setLocation(location);
        setIsLocationChangeView(false);
    }
    
    const getLocationByCoords = () => {
        const coords = { lat: actualCoords.latitude, lng: actualCoords.longitude };
        fetchPositionsByCoords(coords, handlerChangeLocation);
    } 

    const isDisabled = !Boolean(location.address);

    return (
        <div> 
            <Button className="locationButton" onClick={handlerIsChangeLocation} >
                <LocationOn style={{ position: 'absolute', left: '0' }}/>
                <Box textOverflow="ellipsis" overflow="hidden" className="location-address" >
                    { location?.address || 'ingresar dirección' }
                </Box>
                    <ArrowDropDownIcon style={{ position: 'absolute', right: '0' }}/>
            </Button>
            <div style={{ width:'550px'}} >
                <Dialog open={isLocationChangeView} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">Dirección de tienda</DialogTitle>
                    <DialogContent>
                        <LocationMap currentCoords={actualCoords} setCurrentCoords={setActualCoords} />
                    </DialogContent>
                    <DialogActions>
                        <Grid container justify="flex-end" className="accept-button-container">
                        { loading && <CircularProgress className="circularProgress-pink" /> }
                        <Button
                            size="small"
                            type="submit"
                            disabled={loading}
                            variant="contained"
                            className={loading ? 'mt-30' : 'mt-30 validated-button'}
                            endIcon={<ArrowForwardIosIcon className="arrow-icon" />}
                            onClick={getLocationByCoords}
                        >
                            aceptar
                        </Button>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default DialogChangeLocation;