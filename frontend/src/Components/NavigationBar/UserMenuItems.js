import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Svg from '../Svg';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const UserMenuItems = ({ handleCloseMenu }) => {

  const { t } = useTranslation();

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
        <ListItemText primary={t('Salir')} />
      </ListItem>
    </>
  );
}
UserMenuItems.prototype = {
  handleCloseMenu: PropTypes.func.isRequired
}

export default UserMenuItems;