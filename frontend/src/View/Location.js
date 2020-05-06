import React, { useState, useEffect } from 'react';
import LocationOn from '@material-ui/icons/LocationOn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography, Box, Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';

const Location = () => {

  const [options, setOptions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState();
  const apikey = 'A5liKoRj88kze2rtyInYq-m6Eah7Hkg3Z2bd4kQoBH4';

  const setCurrentLocationByPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    Axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&apiKey=${apikey}`)
    .then((locations) => setCurrentLocation(locations.data.items[0].title))
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setCurrentLocationByPosition);
  }, [])

  const changeOptionLocation = (location) => {
    Axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${apikey}`)
      .then((locations) => setOptions(locations.data.items))
      .catch((error) => console.log(error))
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{marginTop:'10vh'}}
    >
      <Box
        padding="40px"
        borderRadius="12px"
        item
        style={{display:'flex', flexDirection:'column', justifyContent:'center', boxShadow:"rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px"}}
        xs={6}
      >
        <Typography style={{fontSize:'28px', fontWeight:'700', color: '#000', textAlign:'center'}}>Seleccionar una dirección de entrega</Typography>
        <Grid style={{display:'flex', justifyContent:'center'}}>
          <Grid lg={6}>
            <Grid style={{display:"flex", flexDirection:"column", position:'relative'}}>
              <LocationOn style={{position:'absolute', transform:'translate(10px, 30px)'}}/>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                className="pepe"
                value={currentLocation || ''}
                style={{width:'100%'}}
                options={options.map((option) => option.title)}
                renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(event) => changeOptionLocation(event.target.value)}
                  style={{ width:'100%'}}
                  placeholder="Calle Numero, CPostal Partido, Pais"
                  margin="normal"
                  variant="outlined"
                />
                )}
              />
            </Grid>
            <Typography style={{fontSize:'20px', textAlign:'center', display:'flex', alignSelf:'center', marginTop:'30px'}}>Por favor seleccione una direcion para poder continuar, luego esta podra ser modificada.</Typography>
          </Grid>
        </Grid>
        <Button
          size="medium"
          style={{marginTop:'30px', background:'#4EEA5D', color:'#ffff', display:'flex', alignSelf:'center', boxShadow:"0 3px 5px 0 rgba(0,0,0,.1)"}}
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
        >
          continuar
        </Button>
      </Box>
    </Grid>
  );
}

export default Location;