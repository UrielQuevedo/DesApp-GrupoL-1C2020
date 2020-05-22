import React from 'react';
import { Grid, TextField, Button, InputAdornment, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../Styles/Home.css';

const Home = () => {

  const categories = [
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/carniceria_qehdne.jpg', name: 'carniceria' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114822/farmacia_oz38xp.jpg', name: 'farmacia' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/verduleria_qpyzqb.jpg', name: 'verduleria' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/almacen_nksrfp.jpg', name: 'almacen' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114820/kiosco_icwjb0.jpg', name: 'kiosco' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/dietetica_zcwr0l.jpg', name: 'dietetica' },
  ]

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
    return categories.map(({ url, name }, i) => (
      <div className="item-categorie mt-20" key={i}>
        <Box boxShadow={4} className="image-categorie">
          <img
            src={url}
            alt={"Categoria de " + name}
          />
        </Box>
        <p>{name}</p>
      </div>
    ));
  }

  const StoreCategories = () => {
    return (
      <div className="mt-20 storeCategories">
        <span className="title">
          Nuestros rubros
        </span>
        <p className="subtitle" >
          Lo mas cercano de tu casa
        </p>
        <Grid container direction="row">
          <StoreCategoriesList />
        </Grid>
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
      <StoreCategories />
      <Information />
    </>
  );
}

export default Home;