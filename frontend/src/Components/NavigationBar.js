import React from 'react';
import { AppBar, Toolbar, Slide, Button, Box } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../Styles/NavigationBar.css';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  const trigger = useScrollTrigger();

  const UserLocationButton = () => {
    return (
      <Button className="userNavigation">
        <LocationOnIcon />
          <Box textOverflow="ellipsis" className="address" overflow="hidden">
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
            <NavLink to='/' style={{textDecoration: 'none', color:'#000'}}>Compras en casa</NavLink>
          </h2>
          <div style={{flexGrow:'1'}}>
            <Button size="small" variant="contained">
              tu tienda
            </Button>
          </div>
          <UserLocationButton />
          <NavLink to="/" className="item">
            tiendas
          </NavLink>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default NavigationBar;