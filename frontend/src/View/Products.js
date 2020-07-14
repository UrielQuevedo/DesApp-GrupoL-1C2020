import { Breadcrumbs, CircularProgress, Divider, Fade, Grid, List, ListItem, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Alert } from '@material-ui/lab';
import React, { useContext, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import PaginationComponent from '../Components/ProductsAndStores/Pagination';
import SearchLayout from '../Components/ProductsAndStores/SearchLayout';
import ShowStoreOnMap from '../Components/ProductsAndStores/ShowStoresOnMap';
import ProductItem from '../Components/ProductsView/ProductItem';
import { UserContext } from '../Context/UserContext';
import { useGetProductsFiltered } from '../Service/ProductService';
import { useGetCategories, useGetStore } from '../Service/StoreService';
import '../Styles/Stores.css';
import ShoppingCart from '../Components/ShoppingCart/ShoppingCart';

const Products = ({ location }) => {
  const { category, store_id } = useParams();
  const [ isInfoView, setIsInfoView ] = useState(false);
  const { categoriesLoading, categories } = useGetCategories(store_id);
  const { store } = useGetStore(store_id, location);
  const { productsLoading, products, setFilter, filter, totalPages } = useGetProductsFiltered(store_id, category);
  const { user } = useContext(UserContext);

  const filters = [
    { name: 'Menor Precio', value:'price,asc' },
    { name: 'Mayor Precio', value:'price,desc' }
  ];

  const CreateCategoriesItems = () => {
    return categories.map((category, i) => (
      <div key={i}>
        <NavLink className="navlink-item" activeClassName="navlink-item-selected" to={`/stores/${store.id}/products/${category}`} >
          <ListItem className="item">
            { category.toLowerCase() }
            <ArrowForwardIosIcon className="icon" />
          </ListItem>
        </NavLink>
        <Divider variant="middle"  />
      </div>
    ));
  }

  const getClassname = (value) => {
    return "filter-item " + ((value === filter.sort) ? "filter-item-selected" : '');
  }

  const handleChangeFilter = (value) => {
    if (value !== filter.sort) {
      setFilter({ ...filter, sort: value })
    }
  }

  const CreateFiltersItems = () => {
    return filters.map(({ name, value }, i) => (
      <div className={getClassname(value)} key={i} onClick={() => handleChangeFilter(value)}>
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
            { categoriesLoading && <CircularProgress className="stores-loading-data mt-20" /> }
            { !categoriesLoading && <CreateCategoriesItems /> }
          </List>
        </div>
      </div>
    );
  }

  const StoreNavigationBar = () => {
    return (
      <Grid container item>
        <Breadcrumbs aria-label="breadcrumb" style={{ flexGrow: '1' }}>
          <Link to="/stores" style={{ textDecoration:'none' }}>
            Tiendas
          </Link>
          <Typography style={{ textTransform:'capitalize' }} color="textPrimary">
            {store.name}
          </Typography>
          <Typography style={{ textTransform:'capitalize' }} color="textPrimary">
            {category}
          </Typography>
        </Breadcrumbs>
        <div style={{ display:'flex' }}>
          <div onClick={() => setIsInfoView(false)} style={{ fontWeight: 500 }} className={ "icon " + (!isInfoView ? "icon-selected" : "") }>
            Productos
          </div>
          <div onClick={() => setIsInfoView(true)} style={{ fontWeight: 500 }} className={ "icon " + (isInfoView ? "icon-selected" : "") }>
            Informacion
          </div>
          <PaginationComponent isActive={products.length > 0} filter={filter} setFilter={setFilter} totalPages={totalPages} />
        </div>
      </Grid>
    );
  }

  const StoreInformation = () => {
    return (
      <Fade in={true}>
        <Grid container justify="center">
          <Grid container item xs={6} justify="center" direction="column" alignContent="center">
            <h3 style={{ margin:'0', marginBottom:'13px' }}>
              Horarios
            </h3>
            <p style={{textAlign:'start', width:'100%', height:'440px'}}>
              No hay nada aun.
            </p>
          </Grid>
          <Grid container item xs={6} justify="center" direction="column" alignContent="center">
            <h3 style={{ margin:'0' }}>
              Ubicacion
            </h3>
            <p style={{textAlign:'start', width:'100%', marginTop:'0' }}>
              <LocationOnIcon style={{ transform: 'translateY(6px)', marginRight: '2px' }} />
              {store.location.address}
            </p>
            <ShowStoreOnMap userLocation={user.location} stores={[store]} centerLocation={store.location} />
          </Grid>
        </Grid>
      </Fade>
    );
  }

  const ProductsItemsView = () => {
    return products.map((product, i) => (
      <ProductItem key={i} product={product} />
    ));
  }

  const StoreLayout = () => {
    return (
      <Grid container item direction="column" className="stores-container">
        <StoreNavigationBar />
        { isInfoView && <StoreInformation /> }
        { productsLoading && <CircularProgress className="stores-loading-data mt-20" /> }
        { !productsLoading && products.length <= 0 && <Alert className="mt-20" severity="warning">No se encontro ningun producto</Alert>}
        { !isInfoView && !productsLoading && products.length > 0 &&
          <Grid container justify="center" item direction="row" style={{ marginTop:'10px' }}>
            <ProductsItemsView />
          </Grid>
        }
      </Grid>
    );
  }

  return (
    <div style={{ marginTop:'4.5rem', display:'flex' }}>
      <ShoppingCart />
      <LateralMenu />
      <Grid container item xs={10}>
        <Grid container item style={{ padding:'1rem', width:"100%" }} direction="column">
          <SearchLayout name={store.name} subName={store.sector} filter={filter} setFilter={setFilter} />
          <StoreLayout />
        </Grid>
      </Grid>
    </div>
  );
}

export default Products;