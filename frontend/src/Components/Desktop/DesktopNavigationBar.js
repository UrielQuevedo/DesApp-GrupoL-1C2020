import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Slide, Button, Box, Menu, List } from '@material-ui/core';
import '../../Styles/NavigationBar.css';
import { NavLink } from 'react-router-dom';
import UserMenuItems from '../NavigationBar/UserMenuItems';
import UserLocationButton from '../NavigationBar/UserLocationButton';
import PropTypes from 'prop-types';

// Icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserContext } from '../../Context/UserContext';

const DesktopNavigationBar = ({ trigger }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(UserContext);

  const Logo = () => {
    return (
      <h2>
        <NavLink to='/' style={{textDecoration: 'none', color:'#000'}}>
          Compras en casa
        </NavLink>
      </h2>
    );
  }

  const MyStoreButton = () => {
    return (
      <div className="myStoreButton">
        <Button size="small" variant="contained">
          tu tienda
        </Button>
      </div>
    );
  }

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const userMenu = () => {
    return (
      <>
        <Button className="userMenu" aria-controls="simple" aria-haspopup="true" onClick={handleClickMenu}>
          <AccountCircleIcon />
            <Box textOverflow="ellipsis" className="username" overflow="hidden">
              {user.username}
            </Box>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="simple"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <List>
            <UserMenuItems handleCloseMenu={handleCloseMenu} />
          </List>
        </Menu>
      </>
    );
  }

  return (
    <Slide appear={false} in={!trigger} direction="down">
      <AppBar className="navbar-desktop">
        <Toolbar>
          <Logo />
          <MyStoreButton />
          <UserLocationButton address={user.location.address} />
          <NavLink to="/" className="item">
            tiendas
            {console.log(user)}
          </NavLink>
          {userMenu()}
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
DesktopNavigationBar.prototype = {
  trigger: PropTypes.bool.isRequired
}

export default DesktopNavigationBar;