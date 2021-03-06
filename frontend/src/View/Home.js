import { Box, Button, Grid, Grow, InputAdornment, Paper, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/Home.css';
import { categories } from '../Utils/Constans';

const Home = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const { push } = useHistory();

  const searchStores = (data, e) => {
    push('/stores?search=' + data.search.trim());
    e.target.reset();
  }

  const SearchForm = () => {
    return (
      <form onSubmit={handleSubmit(searchStores)}>
        <Grid container>
          <Grid item xs={12} sm={10} lg={10}>
            <TextField
              className="search"
              inputRef={register}
              placeholder={t("Busca cualquier tienda o producto")}
              variant="outlined"
              name="search"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2} lg={2}>
            <Button type="submit" variant="contained" className="buttonSearch">
              {t('buscar')}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  const SearchLayout = () => {
    return (
      <Grid
        container
        justify="center"
        className="searchLayout-container"
      >
        <Grid item xs={12} sm={10} md={7} style={{ transform: 'scale(0.9)' }}>
          <p title={t("¿Qué estas buscando hoy?")}>
            {t("¿Qué estas buscando hoy?")}
          </p>
          <SearchForm />
          <Link style={{ textDecoration:'none' }} to="/stores">
            <Button name="viewStrores" variant="contained" className="buttonStores">
              {t("ver tiendas")}
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }

  const StoreCategoriesList = () => {
    return categories.map(({ url, name }, i) => (
      <Link to={`/stores/category/${name.toUpperCase()}`} key={i} style={{ textDecoration:'none' }}>
        <Grow in={true} {...{ timeout: 1000 + i * 400 }}>
          <div className="item-categorie mt-20">
            <Box boxShadow={7} className="image-categorie">
              <img
                src={url}
                alt={"Categoria de " + name}
              />
            </Box>
            <p>{name}</p>
          </div>
        </Grow>
      </Link>
    ));
  }

  const StoreCategories = () => {
    return (
      <div className="storeCategories">
        <span className="title">
          {t("Nuestros rubros")}
        </span>
        <p className="subtitle" >
          {t("Lo mas cercano de tu casa")}
        </p>
        <Grid container direction="row" justify="center" alignContent="center" alignItems="center">
          <StoreCategoriesList />
        </Grid>
      </div>
    );
  }

  const InformationPaper = ({ title, description, nameButtom, link }) => {
    return (
      <Grid item container xs={12} md={6} justify="center">
        <Paper className="infomation-paper mt-20" elevation={3}>
          <span className="title">
            {title}
          </span>
          <p className="description">
            {description}
          </p>
          <Link style={{ textDecoration:'none' }} to={link}>
            <Button variant="contained">
              {nameButtom}
            </Button>
          </Link>
        </Paper>
      </Grid>
    );
  }
  InformationPaper.prototype = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    nameButtom: PropTypes.string.isRequired,
  };

  const Information = () => {
    return (
      <Grid container justify="center" style={{height:'10%', marginTop:'-4rem'}}>
        {/* Offer */}
        <InformationPaper
          title={t("Ofertas")}
          description={t("No te pierdas las ultimas ofertas que las tiendas tienen para vos, y") + " bla bla bla.."}
          nameButtom={t("ver ofertas")}
          link="/stores/category/offer"
        />
        {/* Store */}
        <InformationPaper
          title={t("Publica tu tienda")}
          description={t("Texto motivador y convincente para publicar tu tienda, y")  + " bla bla bla.."}
          nameButtom={t("publicar")}
          link="/publish/store"
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