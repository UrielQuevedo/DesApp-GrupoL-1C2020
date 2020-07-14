import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Button, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import formatPrice from '../../Utils/Formatters/FormatPrice';

const EditQuantity = ({ handleNextStep, shoppingCart }) => {
  const [ expanded, setExpanded ] = useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ProductOrders = ({ productOrders }) => {
    return (productOrders || []).map(({ product, quantity, totalPrice }, index) => (
      <Grid container item xs="12" key={index} style={{ marginBottom: '10px', borderBottom:'1px solid black'}}>
        <Grid item xs="9">
          <span style={{ fontSize:'18px', fontWeight:'500', textTransform:'capitalize', marginRight:'5px' }}>
            {product.name}
          </span>
          <span>
            {product.brand}
          </span>
          <form>
            <Grid container direction="row" spacing={1} style={{ margin:'15px 0 15px 0'}}>
              <Grid item xs="4">
                <TextField
                  style={{ width:'100%' }}
                  defaultValue={quantity}
                  variant="outlined"
                  type="number"
                  size="small"
                  disabled
                  required
                  inputProps={{ min: "1", max: product.stock, step: "1", pattern:"[0-9] * o\d * [0-9]" }}
                />
              </Grid>
              <Grid container item xs="2" justify="center" alignContent="center" alignItems="center">
                <Button
                  size="medium"
                  color="primary"
                  variant="contained"
                  style={{ minWidth: '0', width:'30px'}}
                >
                  <EditIcon fontSize="small" />
                </Button>
              </Grid>
              <Grid item xs="2" container justify="center" alignContent="center" alignItems="center">
                <Button
                  size="medium"
                  color="secondary"
                  variant="outlined"
                  style={{ minWidth: '0', width:'30px'}}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs="3" style={{marginTop:'2px'}}>
          <b>Total:</b> {formatPrice(totalPrice)}
        </Grid>
      </Grid>
    ))
  }

  const Orders = () => {
    return (shoppingCart.orders || []).map(({ productOrders, storeName }, index) => (
      <ExpansionPanel expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
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
    ));
  }

  return (
    <form>
      <Orders />
      <div style={{ marginTop:'10px', borderTop:'2px solid black', paddingTop:'10px'}}>
        <Grid container item xs="12" justify="space-between">
          <b>Subtotal </b>
          {formatPrice(shoppingCart.totalPrice)}
        </Grid>
      </div>
      <Button
        style={{ margin:'15px 0 15px 0', background:'#FB849D', color:'#ffff' }}
        fullWidth
        size="large"
        variant="contained"
        onClick={handleNextStep}
      >
        Continuar
      </Button>
    </form>
  );
}

export default EditQuantity;