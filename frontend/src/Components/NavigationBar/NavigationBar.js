import React from 'react';
import DesktopNavigationBar from '../Desktop/DesktopNavigationBar';
import MobileNavigationBar from '../Mobile/MobileNavigationBar';
import { Hidden, useScrollTrigger } from '@material-ui/core';

const NavigationBar = () => {
  const trigger = useScrollTrigger();

  return (
    <>
      <Hidden smDown>
        <DesktopNavigationBar trigger={trigger} />
      </Hidden>
      <Hidden mdUp>
        <MobileNavigationBar trigger={trigger} />
      </Hidden>
    </>
  );
}

export default NavigationBar;