import { Breadcrumbs, Button, Divider, Grid, InputAdornment, List, ListItem, TextField, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MapIcon from '@material-ui/icons/Map';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import L from 'leaflet';
import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link, NavLink, useHistory } from 'react-router-dom';
import '../Styles/Stores.css';

const Stores = ({ stores, loading, user }) => {
  const query = new URLSearchParams(window.location.search);
  const { push } = useHistory();
  const [ filter, setFilter ] = useState({ name: query.get('filter') });
  const [ isMapView, setisMapView ] = useState(false);

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

  const userLocation = new L.Icon({
    iconUrl: '../svg/ubicacion.svg',
    iconRetinaUrl: '../svg/ubicacion.svg',
    iconSize: [35, 35],
  });

  const storeLocation = new L.Icon({
    iconUrl: '../svg/tienda.svg',
    iconRetinaUrl: '../svg/tienda.svg',
    iconSize: [35, 35],
  });

  const MapView = () => {
    return (
      <Map center={[ user.location.latitude, user.location.longitude ]} zoom={16} style={{ height:'440px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
          <Marker icon={userLocation} position={[ user.location.latitude, user.location.longitude ]}>
            <Popup minWidth={90}>
              <span>
                Tu Ubicacion
              </span>
            </Popup>
          </Marker>
        {
          stores.map(({ name, sector, location }, i) => (
            <Marker icon={storeLocation} key={i} position={[location.latitude, location.longitude]} >
              <Popup minWidth={90}>
                <span>
                  {name + " (" + sector + ")"}
                </span>
              </Popup>
            </Marker>
          ))
        }
      </Map>
    );
  }

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

  const handlerSearchStores = () => {
    query.set('search','chino');
    push(`${window.location.pathname}?${query}`);
  }

  const handlerChangeFilter = (name) => {
      if (filter.name === name) {
        setFilter({})
        query.delete('filter')
      } else {
        setFilter({ name: name });
        query.set('filter', name)
      }
    push(`${window.location.pathname}?${query}`);
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
            endAdornment: <Button onClick={handlerSearchStores}>BUSCAR</Button>
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
          {/* <Typography style={{ textTransform:'capitalize' }} color="textPrimary">{category}</Typography> */}
        </Breadcrumbs>
        <div style={{ display:'flex' }}>
          <FormatListBulletedIcon onClick={() => setisMapView(false)} className={ "icon " + (!isMapView ? "icon-selected" : "") } />
          <MapIcon onClick={() => setisMapView(true)} className={ "icon " + (isMapView ? "icon-selected" : "") } />
          <div className="pagination-container">
            <Pagination count={1} page={1} />
          </div>
        </div>
      </Grid>
    );
  }

  const StoresItemsView = () => {
    return stores.map(({ name, sector, location }, i) => (
      <div key={i} className="store-item-container">
        <img src="https://via.placeholder.com/180" style={{ borderRadius:'6px' }} alt="imagen del store"/>
        <div className="name">
          {name}
        </div>
        <div className="address">
          {location.address}
        </div>
        <div className="sector">
          {sector}
        </div>
      </div>
    ));
  }

  const StoresView = () => {
    return (
      <Grid container item style={{ padding:'1rem', width:"100%" }} direction="column">
        <FilterLayout />
        <Grid container item direction="column" className="stores-container">
          <StoreViewTop />
          { !loading &&
            <Grid container justify="center" item direction="row" style={{ marginTop:'10px' }}>
              { isMapView ? <MapView /> : <StoresItemsView /> }
            </Grid>
          }
        </Grid>
      </Grid>
    );
  }

  return (
    <div style={{ marginTop:'4.5rem', display:'flex' }}>
      <LateralMenu />
      <Grid container item xs={10}>
        <StoresView />
      </Grid>
    </div>
  );
}

export default Stores;