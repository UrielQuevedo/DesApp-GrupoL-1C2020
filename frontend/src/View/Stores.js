import { Grid, Divider, List, ListItem, TextField, InputAdornment, Button } from '@material-ui/core';
import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import '../Styles/Stores.css';
import Pagination from '@material-ui/lab/Pagination';

const Stores = () => {

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
    return categories.map(({ name }) => (
      <>
        <ListItem className="item">
          { name }
          <ArrowForwardIosIcon className="icon" />
        </ListItem>
        <Divider variant="middle"  />
      </>
    ));
  }

  const CreateFiltersItems = () => {
    return filters.map(({ name }) => (
      <div className="filter-item">
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
            <ListItem className="item">
              promociones
              <ArrowForwardIosIcon className="icon" />
            </ListItem>
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

  const StoresView = () => {
    return (
      <Grid container item style={{ padding:'1rem', width:"100%" }} direction="column">
        <FilterLayout />
        <div className="stores-container">
          <div className="stores-items">
            TIENDAS
          </div>
          <div className="pagination-container">
            <Pagination count={4} page={1} />
          </div>
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