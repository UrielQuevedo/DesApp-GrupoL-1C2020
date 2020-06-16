import React from 'react';
import NavigationProfile from '../Components/ProfileView/NavigationProfile';
import DataContainerProfile from '../Components/ProfileView/DataContainerProfile';
import { Grid } from '@material-ui/core';

const ordersView = () => {
  return (
    <h3>
      No hay nada aun.
    </h3>
  );
}


const UserOrders = () => {
  return (
    <Grid container justify="center" direction="row" style={{ marginTop:'4.5rem', display:'flex' }}>
      <Grid container item xs={9} justify="center">
        <NavigationProfile actualView={0} />
        <DataContainerProfile title="Historial de Ordenes" view={ordersView} />
      </Grid>
    </Grid>
  );
}

export default UserOrders;