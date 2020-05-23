import React, { useState } from 'react';
import { AppBar, Toolbar, Slide, Button, Box, Menu, Collapse, ListItem, ListItemIcon, ListItemText, List, Divider } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import '../Styles/NavigationBar.css';
import { NavLink } from 'react-router-dom';

// Icons
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Svg from './Svg';

const NavigationBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const trigger = useScrollTrigger();

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

  const UserLocationButton = () => {
    return (
      <Button className="userNavigation">
        <LocationOnIcon />
          <Box textOverflow="ellipsis" className="address" overflow="hidden">
            quilmes, buenos aires
          </Box>
        <ArrowDropDownIcon />
      </Button>
    );
  }

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickCollapse = () => {
    setOpen(!open);
  };

  const LanguageSelector = () => {
    return (
      <>
        <ListItem button onClick={handleClickCollapse}>
          <ListItemIcon className="icons">
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary="Idioma" />
          { open ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider />
            <ListItem button>
              <ListItemIcon className="icons">
                <span>
                  <Svg xlink='/svg/Icons.svg#argentina-flag' />
                </span>
              </ListItemIcon>
              <ListItemText primary="Español" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon className="icons">
                <span>
                  <Svg xlink='/svg/Icons.svg#uk-flag' />
                </span>
              </ListItemIcon>
              <ListItemText primary="Ingles" />
            </ListItem>
            <Divider />
          </List>
        </Collapse>
      </>
    );
  }

  const UserMenu = () => {
    return (
      <>
        <Button className="userMenu" aria-controls="simple" aria-haspopup="true" onClick={handleClickMenu}>
          <AccountCircleIcon />
            <Box textOverflow="ellipsis" className="username" overflow="hidden">
              Ricardo Fort
            </Box>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="simple"
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <List>
            <ListItem button onClick={handleCloseMenu}>
              <ListItemIcon className="icons">
              <span>
                <Svg xlink='/svg/Icons.svg#orders' />
              </span>
              </ListItemIcon>
              <ListItemText primary="Mis ordenes" />
            </ListItem>
            <ListItem button onClick={handleCloseMenu}>
              <ListItemIcon className="icons">
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Mis datos" />
            </ListItem>
            <LanguageSelector />
            <ListItem button onClick={handleCloseMenu}>
              <ListItemIcon className="icons">
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItem>
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