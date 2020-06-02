import React, { useContext } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Svg from '../Svg';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

const UserMenuItems = ({ handleCloseMenu }) => {

  const { t } = useTranslation();
  const { setAuth } = useContext(AuthContext);

  const handleLogOut = () => {
    handleCloseMenu();
    setAuth({ type:'LOG_OUT' });
  }

  return (
    <>
      <Link to="/profile" style={{ textDecoration:'none' }}>
        <ListItem button onClick={handleCloseMenu}>
          <ListItemIcon className="icons">
          <span>
            <Svg xlink='/svg/Icons.svg#orders' />
          </span>
          </ListItemIcon>
          <ListItemText primary="Mis ordenes" style={{ color:'#000000de' }} />
        </ListItem>
      </Link>
      <Link to='/profile' style={{ textDecoration:'none' }}>
        <ListItem button onClick={handleCloseMenu}>
          <ListItemIcon className="icons">
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Mis datos" style={{ color:'#000000de' }} />
        </ListItem>
      </Link>
      <LanguageSelector />
      <ListItem button onClick={handleLogOut}>
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