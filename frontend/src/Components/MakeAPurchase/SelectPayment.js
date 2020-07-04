import { Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

const SelectPayment = ({ shoppingCart, handleNextStep, values, setValues }) => {
  const Payments = ({ payments }) => {
    return (payments || []).map((payment, index) => (
      <FormControlLabel value={payment} control={<Radio size="small" required/>} label={payment} key={index} />
    ));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNextStep();
  }

  const handleRadioChange = (id) => (event) => {
    setValues({ ...values, [id]: { payment: event.target.value } });
  }

  const Orders = () => {
    return (shoppingCart.orders || []).map(({ storePayments, storeName, id }, index) => (
      <ExpansionPanel expanded key={index}>
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
            <RadioGroup value={values[id]?.payment} onChange={handleRadioChange(id)} row>
              <Payments payments={storePayments} />
            </RadioGroup>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Orders />
      <Button
        style={{ margin:'15px 0 15px 0', background:'#FB849D', color:'#ffff' }}
        fullWidth
        size="large"
        variant="contained"
        type="submit"
      >
        Continuar
      </Button>
    </form>
  );
}

export default SelectPayment;