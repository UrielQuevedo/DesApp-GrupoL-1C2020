import { AppBar, Box, Button, List, Menu, Toolbar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// Icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../../Styles/NavigationBar.css';
import UserLocationButton from '../UserLocationButton';
import UserMenuItems from '../UserMenuItems';


const DesktopNavigationBar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

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
        <Link style={{ textDecoration:'none' }} 
        to={{
          pathname:'/store',
          state: {
            user: user
          }
        }}>

          <Button size="small" variant="contained">
            tu tienda
          </Button>
        </Link>
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
    <AppBar className="navbar-desktop" position="fixed">
      <Toolbar>
        <Logo />
        <MyStoreButton />
        <UserLocationButton actualLocation={user.location} />
        <NavLink to="/stores" activeClassName="item-actived" className="item">
          tiendas
        </NavLink>
        {userMenu()}
      </Toolbar>
    </AppBar>
  );
}
DesktopNavigationBar.prototype = {
  trigger: PropTypes.bool.isRequired
}

export default DesktopNavigationBar;