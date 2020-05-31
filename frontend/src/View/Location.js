import React, { useState, useEffect, useContext } from 'react';
import LocationOn from '@material-ui/icons/LocationOn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Box, Grid, Button, CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import '../Styles/Location.css';
import { Map, Popup, TileLayer, Marker } from 'react-leaflet';
import { useRef } from 'react';
import { useHereMapService } from '../Service/HereMapService';
import { sendBuyerLocationRequest } from '../Service/Api';
import { useHistory } from 'react-router';
import { UserContext } from '../Context/UserContext';

const Location = () => {
  const refMarker = useRef();
  const [ isLocationChangeView, setIsLocationChangeView ] = useState(false);
  const [ actualCoords, setActualCoords ] = useState({});
  const { loading, location, fetchPositionsByCoords } = useHereMapService();
  const { setUser } = useContext(UserContext);
  const { push } = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setActualCoords({ lat: coords.latitude, lng: coords.longitude });
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

  const handlerUpdatePosition = () => {
    const marker = refMarker.current;
    if (marker != null) {
      setActualCoords(marker.leafletElement.getLatLng());
    };
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

  const handlerChangeLocation = () => {
    fetchPositionsByCoords(actualCoords, () => setIsLocationChangeView(false));
  }

  const LocationChangeView = () => {
    return (
      <>
        <Map center={actualCoords} zoom={16}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={actualCoords}
            draggable={true}
            ondragend={handlerUpdatePosition}
            ref={refMarker}
          >
            <Popup minWidth={90}>
              <span>
                TU UBICACION
              </span>
            </Popup>
          </Marker>
        </Map>
        <Grid container justify="flex-end" className="accept-button-container">
          { loading && <CircularProgress className="circularProgress-pink" /> }
          <Button
            size="small"
            type="submit"
            disabled={loading}
            variant="contained"
            className={loading ? 'mt-30' : 'mt-30 validated-button'}
            endIcon={<ArrowForwardIosIcon className="arrow-icon" />}
            onClick={handlerChangeLocation}
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