import { Breadcrumbs, CircularProgress, Divider, Fade, Grid, List, ListItem, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MapIcon from '@material-ui/icons/Map';
import { Alert } from '@material-ui/lab';
import React, { useContext, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import PaginationComponent from '../Components/ProductsAndStores/Pagination';
import SearchLayout from '../Components/ProductsAndStores/SearchLayout';
import ShowStoreOnMap from '../Components/ProductsAndStores/ShowStoresOnMap';
import { UserContext } from '../Context/UserContext';
import '../Styles/Stores.css';
import { categories } from '../Utils/Constans';

const Stores = ({ stores, storesLoading, totalPages, filter, setFilter }) => {
  const { category } = useParams();
  const [ isMapView, setisMapView ] = useState(false);
  const { user } = useContext(UserContext);

  const filters = [
    { name: 'tarjeta' },
    { name: 'efectivo' }
  ];

  const CreateCategoriesItems = () => {
    return categories.map(({ name }, i) => (
      <div key={i}>
        <NavLink className="navlink-item" activeClassName="navlink-item-selected" to={`/stores/category/${name.toUpperCase()}`} >
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
    return "filter-item " + ((name === filter.payment?.toLowerCase()) ? "filter-item-selected" : '');
  }

  const handlerChangePayment = (name) => {
    filter.payment === name.toUpperCase() ?
    setFilter({...filter, payment: null }) :
    setFilter({...filter, payment: name.toUpperCase() });
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

  const StoresNavigationView = () => {
    return (
      <Grid container item>
        <Breadcrumbs aria-label="breadcrumb" style={{ flexGrow: '1' }}>
          <Link to="/stores" style={{ textDecoration:'none' }}>
            Tiendas
          </Link>
          <Typography style={{ textTransform:'capitalize' }} color="textPrimary">{category}</Typography>
        </Breadcrumbs>
        <div style={{ display:'flex' }}>
          <FormatListBulletedIcon onClick={() => setisMapView(false)} className={ "icon " + (!isMapView ? "icon-selected" : "") } />
          <MapIcon onClick={() => setisMapView(true)} className={ "icon " + (isMapView ? "icon-selected" : "") } />
          <PaginationComponent isActive={stores.length > 0} filter={filter} setFilter={setFilter} totalPages={totalPages} />
        </div>
      </Grid>
    );
  }

  const StoresItemsView = () => {
    return stores.map((store, i) => (
      <div key={i} className="store-item-container">
        <Link
          to={{
            pathname:`/stores/${store.id}/products/BEBIDAS`,
            state: store,
          }}
          style={{textDecoration:'none', color:'#000'}}
        >
          <Fade in={true}>
            <div>
              <img src="https://via.placeholder.com/180" style={{ borderRadius:'6px' }} alt="imagen del store"/>
              <div className="name">
                {store.name}
              </div>
              <div className="address">
                {store.location.address}
              </div>
              <div className="sector">
                {store.sector}
              </div>
            </div>
          </Fade>
        </Link>
      </div>
    ));
  }

  return (
    <div style={{ marginTop:'4.5rem', display:'flex' }}>
      <LateralMenu />
      <Grid container item xs={10}>
        <Grid container item style={{ padding:'1rem', width:"100%" }} direction="column">
          <SearchLayout name="Tiendas" subName="cercanas a tu casa" filter={filter} setFilter={setFilter}  />
          <Grid container item direction="column" className="stores-container">
            <StoresNavigationView />
            { storesLoading && <CircularProgress className="stores-loading-data mt-20" />}
            { !storesLoading && stores.length <= 0 && <Alert className="mt-20" severity="warning">No se encuentro ninguna tienda</Alert>}
            { !storesLoading && stores.length > 0 &&
              <Grid container justify="center" item direction="row" style={{ marginTop:'10px' }}>
                {
                  isMapView ?
                  <ShowStoreOnMap userLocation={user.location} stores={stores} centerLocation={user.location} />
                  :
                  <StoresItemsView />
                }
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stores;