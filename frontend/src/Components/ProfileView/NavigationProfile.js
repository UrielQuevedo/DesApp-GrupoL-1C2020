import { AppBar, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationProfile = ({ actualView }) => {
  return (
    <div style={{ marginTop:'20px' }}>
      <AppBar position="static" color="default" style={{ background:'#ffff' }}>
        <Tabs
          value={actualView}
          centered
        >
          <Tab component={Link} label="Mis Ordenes" to="/profile/myorders" className="default-link"/>
          <Tab component={Link} label="Mis Datos" to="/profile/mydata" className="default-link" />
          <Tab label="Cubrir Gastos" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default NavigationProfile;