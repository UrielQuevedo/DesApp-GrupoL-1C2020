import React from 'react';
import { AppBar, Toolbar, Slide, Button, Box } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../Styles/NavigationBar.css';

const NavigationBar = () => {
  const trigger = useScrollTrigger();

  const UserLocationButton = () => {
    return (
      <Button className="userNavigation">
        <LocationOnIcon />
          <Box textOverflow="ellipsis" className="test" overflow="hidden">
            Quilmes, Buenos Aires sadasdasdasdsad
          </Box>
        <ArrowDropDownIcon />
      </Button>
    );
  }

  const UserMenu = () => {
    return (
      <>
        <AccountCircleIcon />
        Uriel
        <ArrowDropDownIcon />
      </>
    );
  }

  return (
    <Slide appear={false} in={!trigger} direction="down">
      <AppBar className="navbar-desktop" style={{background:'#ffff', color:'#000'}}>
        <Toolbar>
          <h2>
            Compras en casa
          </h2>
          <div style={{flexGrow:'1'}}><Button size="small" variant="contained">tu tienda</Button></div>
          <UserLocationButton />
          <span style={{marginRight:'20px'}}>
            TIENDAS
          </span>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default NavigationBar;