import React from 'react';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../Styles/Home.css';


const Home = () => {

  const SearchLayout = () => {
    return (
      <Grid
        container
        justify="center"
        className="searchLayout-container"
      >
        <Grid item xs={7}>
          <p>
            ¿Que estas buscando hoy?
          </p>
          <form noValidate autoComplete="off">
            <TextField
              className="search"
              placeholder="Busca cualquier producto"
              variant="outlined"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
            />
            <Button variant="contained" className="buttonSearch">
              buscar
            </Button>
          </form>
          <Button variant="contained" className="buttonStores">
            ver tiendas
          </Button>
        </Grid>
      </Grid>
    );
  }

  const StoreCategoriesList = () => {
    return (
      <div>
        RUBROS
      </div>
    );
  }

  const Information = () => {
    return (
      <div>
        INFORMACION
      </div>
    );
  }

  return (
    <>
      <SearchLayout />
      <StoreCategoriesList />
      <Information />
    </>
  );
}

export default Home;