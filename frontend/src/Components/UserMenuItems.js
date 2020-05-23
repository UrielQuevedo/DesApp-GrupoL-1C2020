import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, List, Divider } from '@material-ui/core';

// Icons
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Svg from './Svg';

const UserMenuItems = ({ handleCloseMenu }) => {

  const LanguageSelector = () => {
    const [open, setOpen] = useState(false);

    const handleClickCollapse = () => {
      setOpen(!open);
    };

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

  return (
    <>
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
    </>
  );
}

export default UserMenuItems;