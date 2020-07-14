import React from 'react';
import { Grid, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory } from 'react-router';

const SuccessfulPurchase = () => {
  const { push } = useHistory();
  return (
    <Grid container justify="center">
      <Grid container item justify="center" direction="column" alignItems="center" style={{ background:'#ffff'}}>
        <CheckCircleIcon style={{ fontSize: 100, color:'green' }}/>
        <h2 style={{ color:'green' }}>Compra Exitosa</h2>
      </Grid>
      <Button
        variant="contained"
        fullWidth
        style={{ margin:'15px 0 15px 0', background:'#FB849D', color:'#ffff' }}
        onClick={() => push('/stores')}
      >
        ir a tiendas
      </Button>
    </Grid>
  );
}

export default SuccessfulPurchase;