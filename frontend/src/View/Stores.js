import { Grid, Divider, List, ListItem, TextField, InputAdornment, Button, Typography, Breadcrumbs } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import '../Styles/Stores.css';
import Pagination from '@material-ui/lab/Pagination';
import { NavLink, useParams, Link } from 'react-router-dom';
import MapIcon from '@material-ui/icons/Map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const Stores = () => {

  const { category } = useParams();
  const [ filter, setFilter ] = useState({});

  const categories = [
    { name: 'carniceria' },
    { name: 'farmacia' },
    { name: 'verduleria' },
    { name: 'almacen' },
    { name: 'kiosco' },
    { name: 'dietetica' },
  ];

  const filters = [
    { name: 'tarjetas' },
    { name: 'efectivo' }
  ];

  const CreateCategoriesItems = () => {
    return categories.map(({ name }, i) => (
      <div key={i}>
        <NavLink className="navlink-item" activeClassName="navlink-item-selected" to={'/stores/category/' + name} >
          <ListItem className="item">
            { name }
            <ArrowForwardIosIcon className="icon" />
          </ListItem>
        </NavLink>
        <Divider variant="middle"  />
      </div>
  ));
  }

  const getClassname = (name) => {
    return "filter-item " + ((name === filter.name) ? "filter-item-selected" : '');
  }

  const handlerChangeFilter = (name) => {
    filter.name === name ? setFilter({}) : setFilter({ name: name });
  }

  const CreateFiltersItems = () => {
    return filters.map(({ name }, i) => (
      <div className={getClassname(name)} key={i} onClick={() => handlerChangeFilter(name)}>
        { name }
      </div>
    ));
  }

  const LateralMenu = () => {
    return (
      <div className="container-lateral-menu">
        <div className="container-menu">
          <List>
            <Grid container item justify="center" direction="column" alignItems="center">
              <CreateFiltersItems />
            </Grid>
            <Divider variant="middle" />
            <NavLink className="navlink-item" activeClassName="navlink-item-selected" to="/stores/category/offer">
              <ListItem className="item">
                promociones
                <ArrowForwardIosIcon className="icon" />
              </ListItem>
            </NavLink>
            <Divider variant="middle"  />
            <CreateCategoriesItems />
          </List>
        </div>
      </div>
    );
  }

  const FilterLayout = () => {
    return (
      <div className="search-container">
        <h1>
          Tiendas
          <span>
            cercanas a tu casa
          </span>
        </h1>
        <TextField
          variant="outlined"
          size="small"
          className="search-button"
          placeholder="Busca cualquier tienda"
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            endAdornment: <Button>BUSCAR</Button>
          }}
        />
      </div>
    );
  }

  const StoreViewTop = () => {
    return (
      <Grid container item>
        <Breadcrumbs aria-label="breadcrumb" style={{ flexGrow: '1' }}>
          <Link to="/stores" style={{ textDecoration:'none' }}>
            Tiendas
          </Link>
          <Typography style={{ textTransform:'capitalize' }} color="textPrimary">{category}</Typography>
        </Breadcrumbs>
        <div style={{ display:'flex' }}>
          <FormatListBulletedIcon style={{ marginRight: '10px' }}/>
          <MapIcon />
          <div className="pagination-container">
            <Pagination count={4} page={1} />
          </div>
        </div>
      </Grid>
    );
  }

  const StoresView = () => {
    return (
      <Grid container item style={{ padding:'1rem', width:"100%" }} direction="column">
        <FilterLayout />
        <div className="stores-container">
          <StoreViewTop />
          { category }
        </div>
      </Grid>
    );
  }

  return (
    <div style={{ marginTop:'4.5rem' }}>
      <div style={{ display:'flex' }}>
        <LateralMenu />
        <StoresView />
      </div>
    </div>
  );
}

export default Stores;