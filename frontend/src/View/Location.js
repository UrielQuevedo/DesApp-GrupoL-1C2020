import { Box, Button, CircularProgress, Grid } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LocationOn from '@material-ui/icons/LocationOn';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import LocationMap from '../Components/LocationMap';
import { UserContext } from '../Context/UserContext';
import { sendBuyerLocationRequest } from '../Service/Api';
import { useHereMapService } from '../Service/HereMapService';
import '../Styles/Location.css';

const Location = () => {
  const [ isLocationChangeView, setIsLocationChangeView ] = useState(false);
  const [ actualCoords, setActualCoords ] = useState({});
  const { loading, fetchPositionsByCoords } = useHereMapService();
  const [ location, setLocation ] = useState({});
  const { setUser } = useContext(UserContext);
  const { push } = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setActualCoords(coords);
    });
  }, [])

  const sendLocation = async () => {
    const userData = await sendBuyerLocationRequest(localStorage.id, location);
    setUser(userData);
    push('/');
  }

  const handlerIsChangeLocation = () => {
    setIsLocationChangeView(true);
  }

  const LocationView = () => {
    const isDisabled = !Boolean(location.address);
    return (
      <>
        <Grid
          container
          justify="center"
        >
          <Button className="location-button" onClick={handlerIsChangeLocation}>
            <LocationOn />
              <Box textOverflow="ellipsis" overflow="hidden" className="location-address">
                { location?.address || 'ingresar dirección' }
              </Box>
            <ArrowDropDownIcon />
          </Button>
        </Grid>
        <Grid container justify="center">
          <p className="description-location">
            Ingrese una dirección para poder continuar
          </p>
        </Grid>
        <Grid container justify="flex-end" className="continue-button-container">
          <Button
            size="small"
            type="submit"
            disabled={isDisabled}
            variant="contained"
            onClick={sendLocation}
            className={isDisabled ? 'mt-30' : 'continue-button'}
          >
            continuar
            <ArrowForwardIosIcon className="arrow-icon" />
          </Button>
        </Grid>
      </>
    );
  }

  const handlerChangeLocation = (location) => {
    setLocation(location);
    setIsLocationChangeView(false);
  }

  const getLocationByCoords = () => {
    const coords = { lat: actualCoords.latitude, lng: actualCoords.longitude };
    fetchPositionsByCoords(coords, handlerChangeLocation);
  }

  const LocationChangeView = () => {
    return (
      <>
        <LocationMap currentCoords={actualCoords} setCurrentCoords={setActualCoords} />
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
      </>
    );
  }

  return (
    <Grid container justify="center" alignItems="center" style={{ height:'100vh' }}>
      <div className="color-strip" />
        <Box
          borderRadius="12px"
          padding="40px"
          item
          boxShadow={4}
          textAlign="center"
          className="location-container"
        >
          <h1>
            Dirección de entrega
          </h1>
          { isLocationChangeView ? <LocationChangeView /> : <LocationView /> }
        </Box>
    </Grid>
  );
}

export default Location;