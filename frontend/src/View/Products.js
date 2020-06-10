import { Breadcrumbs, CircularProgress, Divider, Grid, List, ListItem, Typography, Fade } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Alert } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import React, { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import ProductItem from '../Components/ProductsView/ProductItem';
import SearchLayout from '../Components/ProductsView/SearchLayout';
import { useGetProductsFiltered } from '../Service/ProductService';
import { useGetCategories, useGetStore } from '../Service/StoreService';
import '../Styles/Stores.css';

const Products = () => {
  const { category, store_id } = useParams();
  const [ isInfoView, setIsInfoView ] = useState(false);
  const { categoriesLoading, categories } = useGetCategories(store_id);
  const { store } = useGetStore(store_id);
  const { productsLoading, products, setFilter, filter, totalPages } = useGetProductsFiltered(store_id, category);

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

  const handlePage = (_, value) => {
    const nextPage = value - 1;
    if (nextPage !== filter.page) {
      setFilter({ ...filter, page: nextPage });
    }
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
          <div onClick={() => setIsInfoView(false)} className={ "icon " + (!isInfoView ? "icon-selected" : "") }>
            Productos
          </div>
          <div onClick={() => setIsInfoView(true)} className={ "icon " + (isInfoView ? "icon-selected" : "") }>
            Informacion
          </div>
          <div className="pagination-container">
            { products.length > 0 && <Pagination onChange={handlePage} count={totalPages} page={filter.page + 1} /> }
          </div>
        </div>
      </Grid>
    );
  }

  const StoreInformation = () => {
    return (
      <Fade in={true}>
        <div>
          {store.location.address}
        </div>
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
        { productsLoading && <CircularProgress className="stores-loading-data mt-20" /> }
        { !productsLoading && products.length <= 0 && <Alert className="mt-20" severity="warning">No se encuentro ningun producto</Alert>}
        { !productsLoading && products.length > 0 &&
          <Grid container justify="center" item direction="row" style={{ marginTop:'10px' }}>
            {
              isInfoView ? <StoreInformation /> : <ProductsItemsView />
            }
          </Grid>
        }
      </Grid>
    );
  }

  return (
    <div style={{ marginTop:'4.5rem', display:'flex' }}>
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