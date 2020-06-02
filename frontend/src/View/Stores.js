import { Grid } from '@material-ui/core';
import React from 'react';

const Stores = () => {
  const LateralMenu = () => {
    return (
      <div>
        MENU
      </div>
    );
  }

  const FilterLayout = () => {
    return (
      <div>
        BUSCADOR Y FILTRO
      </div>
    );
  }

  const StoresView = () => {
    return (
      <div>
        <FilterLayout />
        MUESTRO STORES
      </div>
    );
  }

  return (
    <div style={{ marginTop:'5rem' }}>
      <LateralMenu />
      <Grid container>
        <StoresView />
      </Grid>
    </div>
  );
}

export default Stores;