import React, { useContext } from 'react';
import DesktopNavigationBar from '../Desktop/DesktopNavigationBar';
import MobileNavigationBar from '../Mobile/MobileNavigationBar';
import { Hidden, useScrollTrigger } from '@material-ui/core';
import { UserContext } from '../../Context/UserContext';

const NavigationBar = () => {
  const trigger = useScrollTrigger();
  const { user } = useContext(UserContext);

  if (!user.location) return null;

  return (
    <>
      <Hidden smDown>
        <DesktopNavigationBar trigger={trigger} user={user} />
      </Hidden>
      <Hidden mdUp>
        <MobileNavigationBar trigger={trigger} user={user} />
      </Hidden>
    </>
  );
}

export default NavigationBar;