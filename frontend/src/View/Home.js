import React from 'react';
import { Grid, TextField, Button, InputAdornment, Box, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../Styles/Home.css';
import PropTypes from 'prop-types';

const Home = () => {

  const categories = [
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/carniceria_qehdne.jpg', name: 'carniceria' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114822/farmacia_oz38xp.jpg', name: 'farmacia' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/verduleria_qpyzqb.jpg', name: 'verduleria' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/almacen_nksrfp.jpg', name: 'almacen' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114820/kiosco_icwjb0.jpg', name: 'kiosco' },
    { url: 'https://res.cloudinary.com/dddzzcrzg/image/upload/v1590114819/dietetica_zcwr0l.jpg', name: 'dietetica' },
  ]

  const SerachForm = () => {
    return (
      <Grid container>
        <Grid item xs={12} sm={10} lg={10}>
          <TextField
            className="search"
            placeholder="Busca cualquier producto"
            variant="outlined"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2} lg={2}>
          <Button name="search" variant="contained" className="buttonSearch">
            buscar
          </Button>
        </Grid>
      </Grid>
    );
  }

  const SearchLayout = () => {
    return (
      <Grid
        container
        justify="center"
        className="searchLayout-container"
      >
        <Grid item xs={12} sm={10} md={7}>
          <p>
            ¿Que estas buscando hoy?
          </p>
          <SerachForm />
          <Button name="viewStrores" variant="contained" className="buttonStores">
            ver tiendas
          </Button>
        </Grid>
      </Grid>
    );
  }

  const StoreCategoriesList = () => {
    return categories.map(({ url, name }, i) => (
      <div className="item-categorie mt-20" key={i}>
        <Box boxShadow={7} className="image-categorie">
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

  const InformationPaper = ({ title, description, nameButtom, marginValue }) => {
    return (
      <Paper className="infomation-paper" elevation={3} style={{ marginRight: marginValue }}>
        <span className="title">
          {title}
        </span>
        <p className="description">
          {description}
        </p>
        <Button variant="contained">
          {nameButtom}
        </Button>
      </Paper>
    );
  }
  InformationPaper.prototype = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    nameButtom: PropTypes.string.isRequired,
    marginValue: PropTypes.string,
  };
  InformationPaper.defaultProps = {
    marginValue: '0',
  };

  const Information = () => {
    return (
      <Grid container justify="center" direction="row">
        {/* Offer */}
        <InformationPaper
          title="Ofertas"
          description="No te pierdas las ultimas ofertas que las tiendas tienen para vos, y bla bla bla.."
          nameButtom="ver ofertas"
          marginValue="30px"
        />
        {/* Store */}
        <InformationPaper
          title="Publica tu tienda"
          description="Texto motivador y convincente para publicar tu tienda, y bla bla bla.."
          nameButtom="publicar tienda"
        />
        <div className="background-color" />
      </Grid>
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