import React from 'react';
import { AppBar, Toolbar, IconButton, List, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../Styles/NavigationBar.css';
import { useState } from 'react';
import UserMenuItems from './UserMenuItems';

const MobileNavigationBar = () => {
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
          <UserMenuItems handleCloseMenu={handlerNavigationBarClose} />
        </List>
      </Drawer>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={handlerNavigationBarOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideNavigationBar />
    </>
  );
}

export default MobileNavigationBar;