import React, { useContext, useState, useEffect } from 'react';
import NavigationProfile from '../Components/ProfileView/NavigationProfile';
import DataContainerProfile from '../Components/ProfileView/DataContainerProfile';
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core';
import { UserContext } from '../Context/UserContext';
import { formatDateAndTime } from '../Utils/Formatters/FormatDate.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCart from '../Components/ShoppingCart/ShoppingCart';
import { addProductToShoppingCartOrder, getOrdersHistory } from '../Service/Api';
import { ShoppingCartContext } from '../Context/ShoppingCartContext';
import formatPrice from '../Utils/Formatters/FormatPrice';

const UserOrders = () => {
  const { user } = useContext(UserContext);
  const { setShoppingCart } = useContext(ShoppingCartContext);
  const [ expanded, setExpanded ] = useState('');
  const [ ordersHistory, setOrdersHistory ] = useState([]);

  useEffect(() => {
    getOrdersHistory(user.id)
      .then((d) => setOrdersHistory(d))
  }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ProductOrders = ({ productOrders }) => {
    return (productOrders || []).map(({ product, totalPrice, quantity }, index) => (
      <Grid container item xs="12" key={index} style={{ marginBottom: '10px' }}>
        <Grid item xs="1">
          <span>
            x{quantity}
          </span>
        </Grid>
        <Grid item xs="8">
          <span style={{ fontSize:'18px', fontWeight:'500', textTransform:'capitalize', marginRight:'5px' }}>
            {product.name}
          </span>
          <span>
            {product.brand}
          </span>
        </Grid>
        <Grid item xs="3" style={{marginTop:'2px'}}>
          <b>Total:</b> {formatPrice(totalPrice)}
        </Grid>
      </Grid>
    ))
  }

  const lastOrders = (orders, id) => {
    return (orders || []).map(({ productOrders, storeName }, index) => (
      <ExpansionPanel expanded={expanded === 'panel' + index + id} onChange={handleChange('panel' + index + id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Grid container alignContent="center" alignItems="center">
            <img src="https://via.placeholder.com/180" style={{ borderRadius:'6px', height:'50px', width:'50px' }} alt="imagen del store"/>
            <h3 style={{ marginLeft: '10px' }}>{storeName}</h3>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <ProductOrders productOrders={productOrders} />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))
  }

  const handleAddOrderToShoppingCart = (orders) => {
    orders.forEach(({ productOrders }) => {
      productOrders.forEach(({ product, quantity}) => {
        addProductToShoppingCartOrder(user.id, { quantity: quantity, productId: product.id })
          .then((d) => setShoppingCart(d));
        });
      console.log("X VEZ")
    });
  }

  const ordersView = () => {
    return (ordersHistory || []).map(({ orders, date, id }, i) => (
      <Grid container alignContent="center" alignItems="center" justify="center">
        <Grid item xs={5} key={i} style={{ textAlign:'center' }}>
          <h3 style={{ color:'#ffff' }}>Orden del { formatDateAndTime(date) }</h3>
          {lastOrders(orders, id)}
        </Grid>
        <Grid container justify="center" item xs={8} style={{marginTop:'10px'}}>
          <Button color="primary" variant="contained" onClick={() => handleAddOrderToShoppingCart(orders)}>
            Agregar al carrito
          </Button>
        </Grid>
      </Grid>
    ));
  }

  return (
    <Grid container justify="center" direction="row" style={{ marginTop:'4.5rem', display:'flex', marginBottom:'30px' }}>
      <ShoppingCart />
      <Grid container item xs={9} alignContent="center" alignItems="center" justify="center">
        <NavigationProfile actualView={0} />
        <DataContainerProfile title="Historial de Ordenes" view={() => ordersView()} style={{ padding:'20px' }} />
      </Grid>
    </Grid>
  );
}

export default UserOrders;