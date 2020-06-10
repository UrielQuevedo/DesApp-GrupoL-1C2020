import { AppBar, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Slide, Toolbar } from '@material-ui/core';
// Icons
import StoreIcon from '@material-ui/icons/Store';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styles/NavigationBar.css';
import UserLocationButton from '../UserLocationButton';
import UserMenuItems from '../UserMenuItems';
import Svg from '../../Svg';


const MobileNavigationBar = ({ trigger, user }) => {
  const [open, setOpen] = useState(false);

  const handlerNavigationBarOpen= () => {
    setOpen(true);
  }

  const handlerNavigationBarClose= () => {
    setOpen(false);
  }

  const SideNavigationBar = () => {
    return (
      <Drawer
        anchor='left'
        open={open}
        onClose={handlerNavigationBarClose}
      >
        <List style={{width:'200px'}}>
          <Link to="/store" style={{ textDecoration:'none' }}>
            <ListItem button>
              <ListItemIcon className="icons">
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Mi tienda" style={{ color:'#000000de' }} />
            </ListItem>
          </Link>
          <UserMenuItems handleCloseMenu={handlerNavigationBarClose} />
        </List>
      </Drawer>
    );
  }

  return (
    <>
      <Slide appear={false} in={!trigger} direction="down">
        <AppBar className="navbar-desktop">
          <Toolbar>
            <IconButton edge="start" onClick={handlerNavigationBarOpen}>
              <Svg xlink='/svg/Icons.svg#menu' />
            </IconButton>
            <Grid container justify="center">
              <UserLocationButton actualLocation={user.location} />
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
      <SideNavigationBar />
    </>
  );
}
MobileNavigationBar.prototype = {
  trigger: PropTypes.bool.isRequired
}

export default MobileNavigationBar;