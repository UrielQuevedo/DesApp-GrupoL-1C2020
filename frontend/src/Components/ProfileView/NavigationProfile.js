import { AppBar, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationProfile = ({ actualView }) => {
  return (
    <div style={{ marginTop:'20px' }}>
      <AppBar position="static" color="default" style={{ background:'#ffff' }}>
        <Tabs
          value={actualView}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Link to="/profile/myorders" className="default-link">
            <Tab label="Mis Ordenes" />
          </Link>
          <Link to="/profile/mydata" className="default-link">
            <Tab label="Mis Datos" />
          </Link>
          <Tab label="Cubrir Gastos" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default NavigationProfile;