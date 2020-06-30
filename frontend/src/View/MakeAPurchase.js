import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../Context/ShoppingCartContext';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, TextField, Button, IconButton, Divider, Stepper, Step, StepLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const MakeAPurchase = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [ expanded, setExpanded ] = useState('');
  const [ activeStep, setActiveStep ] = React.useState(0);
  const steps = ['Editar Carrito', 'Forma de Pago', 'Tipo de Entrega'];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBuy = () => {
    console.log("COMPRADO")
  };

  const ProductOrders = ({ productOrders }) => {
    return (productOrders || []).map(({ product, quantity, totalPrice }) => (
      <Grid container item xs="12" style={{ marginBottom: '10px', borderBottom:'1px solid black'}}>
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
          <b>Total:</b> ${totalPrice}
        </Grid>
      </Grid>
    ))
  }

  const Orders = () => {
    return (shoppingCart.orders || []).map(({ productOrders }, i) => (
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
      <Grid container item xs="3" justify="center" direction="column">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Orders />
        {
          activeStep === 0 &&
          <div style={{ marginTop:'10px', borderTop:'2px solid black', paddingTop:'10px'}}>
            <Grid container item xs="12" justify="space-between">
              <b>Subtotal </b>
              ${shoppingCart.totalPrice}
            </Grid>
          </div>
        }
        {
          activeStep >= steps.length - 1 ?
          <Button
            style={{ margin:'15px 0 15px 0', background:'#FB849D', color:'#ffff' }}
            fullWidth
            size="large"
            variant="contained"
            onClick={handleBuy}
          >
            comprar
          </Button>
          :
          <Button
            style={{ margin:'15px 0 15px 0', background:'#FB849D', color:'#ffff' }}
            fullWidth
            size="large"
            variant="contained"
            onClick={handleNext}
          >
            Continuar
          </Button>
        }
      </Grid>
    </Grid>
  );
}

export default MakeAPurchase;