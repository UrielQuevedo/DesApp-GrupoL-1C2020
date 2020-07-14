import { Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

const SelectWithDrawalMethod = ({ shoppingCart, values, setValues, handleBuy }) => {

  const handleRadioChange = (id) => (event) => {
    const oldValue = values[id];
    setValues({ ...values, [id]: { ...oldValue, methodOfDelivery: event.target.value} });
  }

  const handleTurn = (id) => (event) => {
    const oldValue = values[id];
    setValues({ ...values, [id]: { ...oldValue, turnTime: event.target.value } });
  }

  const Turns = ({ turns, id }) => {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Turno</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          required
          defaultValue={values[id].turnTime}
          onChange={handleTurn(id)}
        >
          {
            turns.map((turn, i) => (
              <MenuItem value={turn} key={i}>{turn}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    );
  }

  const Delivery = () => {
    return ['Delivery', 'Turn'].map((option, index) => (
      <FormControlLabel value={option} control={<Radio size="small" required/>} label={option} key={index} />
    ));
  }

  const Orders = () => {
    return (shoppingCart.orders || []).map(({ storeTurns, storeName, id }, index) => (
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
          <Grid container direction="column">
            <RadioGroup value={values[id].methodOfDelivery} onChange={handleRadioChange(id)} row>
              <Delivery />
            </RadioGroup>
            <Grid item>
              { values[id].methodOfDelivery === 'Turn' && <Turns id={id} turns={storeTurns} /> }
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }

  return (
    <form onSubmit={handleBuy}>
      <Orders />
      <Button
        style={{ margin:'15px 0 15px 0', background:'#FB849D', color:'#ffff' }}
        fullWidth
        size="large"
        variant="contained"
        type="submit"
      >
        Comprar
      </Button>
    </form>
  );
}

export default SelectWithDrawalMethod;