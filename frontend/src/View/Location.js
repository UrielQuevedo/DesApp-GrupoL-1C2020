import React, { useState, useEffect } from 'react';
import LocationOn from '@material-ui/icons/LocationOn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography, Box, Grid, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';
import '../Styles/Location.css';
import { useHistory } from 'react-router';
import ErrorIcon from "@material-ui/icons/Error";
import { sendBuyerLocationRequest } from '../Service/Api';

const Location = () => {
  const [ options, setOptions ] = useState([]);
  const [ isValid, setIsValid ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const [ currentLocation, setCurrentLocation ] = useState({});
  const apikey = 'A5liKoRj88kze2rtyInYq-m6Eah7Hkg3Z2bd4kQoBH4';
  const { push } = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLoading(true);
      Axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coords.latitude}%2C${coords.longitude}&apiKey=${apikey}`)
      .then((locations) => setCurrentLocation({ address: locations.data.items[0].address.label }))
      .catch((_) => setIsValid(false))
      .finally((_) => setLoading(false));
    });
  }, [])

  const changeOptionLocation = (e) => {
    const locationAddress = e.target.value;
    e.preventDefault();
    setLoading(true);
    Axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${locationAddress}&in=countryCode:ARG&apiKey=${apikey}`)
      .then((locations) => {
        const { items } = locations.data;
        setOptions(items);
        const { position } = items[0];
        position.lat !== undefined && position.lng !== undefined ? setIsValid(true) : setIsValid(false);
      })
      .catch((_) => {
        setCurrentLocation({ address: locationAddress });
        setIsValid(false)
      })
      .finally((_) => setLoading(false));
  }

  const sendLocation = async (e) => {
    //TODO try catch falta
    e.preventDefault();
    setLoading(true);
    const locations = await Axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${currentLocation.address}&in=countryCode:ARG&apiKey=${apikey}`)
    const { address, position } = locations.data.items[0];
    const location = ({ address: address.label, latitude: position.lat, longitude: position.lng });
    console.log(location);
    //TODO enviar hacia el user
    //const user = await sendBuyerLocationRequest(1, location);
    //push('/')
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ marginTop:'10vh' }}
    >
      <form onSubmit={sendLocation}>
        <Box
          padding="40px"
          borderRadius="12px"
          item="true"
          className="location-form"
          xs={6}
        >
          <Typography className="title">
            Seleccionar una dirección de entrega
          </Typography>
          <Grid justify="center" container>
            <Grid item lg={6}>
              <Grid container direction="row" style={{ position:'relative' }}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  name="location"
                  value={currentLocation.address || ''}
                  style={{ width:'100%', marginLeft:'10px' }}
                  required
                  options={options.map((option) => option.address.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width:'100%'}}
                      placeholder="Calle Numero, CPostal Partido, Pais"
                      margin="normal"
                      onChange={(e) => changeOptionLocation(e)}
                      variant="outlined"
                      name="location"
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                              { isValid && !loading && <LocationOn style={{ color:'#4EEA5D' }}/> }
                              { !isValid && !loading && <ErrorIcon style={{ color:'red' }}/> }
                              { loading && <CircularProgress style={{color:'blue'}} size={20}/> }
                            </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              <Typography className="description">
                Por favor seleccione una direcion para poder continuar, luego esta podra ser modificada.
              </Typography>
            </Grid>
          </Grid>
          <Button
            size="medium"
            type="submit"
            disabled = {!isValid}
            className={ isValid ? 'validated' : 'notValidated' }
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
          >
            continuar
          </Button>
        </Box>
      </form>
    </Grid>
  );
}

export default Location;