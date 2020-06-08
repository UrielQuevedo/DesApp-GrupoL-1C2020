import { Breadcrumbs, Button, CircularProgress, Divider, Grid, InputAdornment, List, ListItem, TextField, Chip, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import { Alert } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import React, { useState } from 'react';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';
import '../Styles/Stores.css';

const Products = ({ categories, store, products, loading, query }) => {
  const { category } = useParams();
  const { push } = useHistory();
  const search = query.get('search');
  const [ payment, setPayment ] = useState({ name: query.get('payment') });
  const [ searchDataToSend, setSearchDataToSend ] = useState('');

  const filters = [
    { name: 'Menor Precio' },
    { name: 'Mayor Precio' }
  ];

  const CreateCategoriesItems = () => {
    return categories.map((category, i) => (
      <div key={i} onClick={() => query.delete('search')}>
        <NavLink className="navlink-item" activeClassName="navlink-item-selected" to={`/stores/${store.id}/products/${category}?${query}`} >
          <ListItem className="item">
            { category.toLowerCase() }
            <ArrowForwardIosIcon className="icon" />
          </ListItem>
        </NavLink>
        <Divider variant="middle"  />
      </div>
  ));
  }

  const getClassname = (name) => {
    return "filter-item " + ((name === payment.name?.toLowerCase()) ? "filter-item-selected" : '');
  }

  const handlerChangePayment = (name) => {
    if (payment.name === name) {
      setPayment({})
      query.delete('payment')
    } else {
      setPayment({ name: name });
      query.set('payment', name.toUpperCase())
    }
    push(`${window.location.pathname}?${query}`);
  }

  const CreateFiltersItems = () => {
    return filters.map(({ name }, i) => (
      <div className={getClassname(name)} key={i} onClick={() => handlerChangePayment(name)}>
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
                ofertas
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

  const deleteSearchFilter = () => {
    query.delete('search')
    push(`${window.location.pathname}?${query}`);
  }

  const handlerSearchStores = (e) => {
    e.preventDefault();
    const data = searchDataToSend.value;
    query.set('search', data);
    push(`${window.location.pathname}?${query}`);
    searchDataToSend.value = '';
  }

  const handleSearchDataToSend = (e) => {
    setSearchDataToSend(e.target);
  }

  const filterLayout = () => {
    return (
      <div className="search-container">
        <h1>
          { store.name }
          <span>
            { store.sector }
          </span>
        </h1>
        <form>
          <TextField
            variant="outlined"
            size="small"
            required
            className="search-button"
            onChange={handleSearchDataToSend}
            placeholder="Busca cualquier producto"
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              endAdornment: <Button type="submit"onClick={handlerSearchStores}>BUSCAR</Button>
            }}
          />
        </form>
        { search &&
          <Chip
            label={`Busqueda: ${search}`}
            onDelete={deleteSearchFilter}
            style={{margin:'10px 0 0 0'}}
          />
        }
      </div>
    );
  }

  const StoresNavigationView = () => {
    return (
      <Grid container item>
        <Breadcrumbs aria-label="breadcrumb" style={{ flexGrow: '1' }}>
          <Link to="/stores" style={{ textDecoration:'none' }}>
            Tiendas
          </Link>
          <Typography style={{ textTransform:'capitalize' }} color="textPrimary">{store.name}</Typography>
          <Typography style={{ textTransform:'capitalize' }} color="textPrimary">{category}</Typography>
        </Breadcrumbs>
        <div style={{ display:'flex' }}>
        <div>Productos</div>
        <div>Informacion</div>
          <div className="pagination-container">
            <Pagination count={1} page={1} />
          </div>
        </div>
      </Grid>
    );
  }

  const StoresItemsView = () => {
    return products.map(({ name, brand, price }, i) => (
      <div key={i} className="store-item-container">
        <img src="https://via.placeholder.com/180" style={{ borderRadius:'6px' }} alt="imagen del store"/>
        <div className="name">
          {price},00$
        </div>
        <div className="address">
          {name}
        </div>
        <div className="sector">
          {brand}
        </div>
      </div>
    ));
  }

  return (
    <div style={{ marginTop:'4.5rem', display:'flex' }}>
      <LateralMenu />
      <Grid container item xs={10}>
        <Grid container item style={{ padding:'1rem', width:"100%" }} direction="column">
          {filterLayout()}
          <Grid container item direction="column" className="stores-container">
            <StoresNavigationView />
            { loading && <CircularProgress className="stores-loading-data mt-20" />}
            { !loading && products.length <= 0 && <Alert className="mt-20" severity="warning">No se encuentro ninguna tienda</Alert>}
            { !loading && products.length > 0 &&
              <Grid container justify="center" item direction="row" style={{ marginTop:'10px' }}>
                <StoresItemsView />
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Products;