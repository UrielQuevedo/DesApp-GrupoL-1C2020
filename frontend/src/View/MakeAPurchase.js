import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../Context/ShoppingCartContext';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MakeAPurchase = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [ expanded, setExpanded ] = useState('panel0');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ProductOrders = ({ productOrders }) => {
    return (productOrders || []).map(({ product, quantity, totalPrice }) => (
      <Grid item xs="12">
        x{quantity}, total: {totalPrice}, {product.name} {product.brand}
      </Grid>
    ))
  }

  const Orders = () => {
    return (shoppingCart.orders || []).map(({ totalPrice, totalQuantity, productOrders }, i) => (
      <ExpansionPanel key={i} expanded={expanded === 'panel' + i} onChange={handleChange('panel' + i)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <span>Imagen</span>
          <span>Nombre de la tienda</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <ProductOrders productOrders={productOrders} />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))
  }

  return (
    <Grid container justify="center" style={{ marginTop:'5rem', fontFamily: 'Segoe UI' }}>
      {console.log(shoppingCart)}
      <Grid container item xs="8" justify="center" direction="column">
        <Orders />
        {shoppingCart.totalPrice}
      </Grid>
    </Grid>
  );
}

export default MakeAPurchase;