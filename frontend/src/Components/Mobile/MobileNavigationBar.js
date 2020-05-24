import React from 'react';
import { AppBar, Toolbar, IconButton, List, Drawer, ListItem, ListItemIcon, ListItemText, Slide, Grid } from '@material-ui/core';
import '../../Styles/NavigationBar.css';
import { useState } from 'react';
import UserMenuItems from '../NavigationBar/UserMenuItems';
import UserLocationButton from '../NavigationBar/UserLocationButton';

// Icons
import StoreIcon from '@material-ui/icons/Store';
import Svg from '../Svg';

const MobileNavigationBar = ({ trigger }) => {
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
          <ListItem button>
            <ListItemIcon className="icons">
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Mi tienda" />
          </ListItem>
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
              <UserLocationButton />
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
      <SideNavigationBar />
    </>
  );
}

export default MobileNavigationBar;