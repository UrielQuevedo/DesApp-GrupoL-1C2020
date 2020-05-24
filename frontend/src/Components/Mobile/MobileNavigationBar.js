import React from 'react';
import { AppBar, Toolbar, IconButton, List, Drawer, ListItem, ListItemIcon, ListItemText, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../../Styles/NavigationBar.css';
import { useState } from 'react';
import UserMenuItems from '../NavigationBar/UserMenuItems';

// Icons
import StoreIcon from '@material-ui/icons/Store';

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
        <AppBar>
          <Toolbar>
            <IconButton edge="start" onClick={handlerNavigationBarOpen}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
      <SideNavigationBar />
    </>
  );
}

export default MobileNavigationBar;