import React from 'react';
import { AppBar, Toolbar, Slide } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const NavigationBar = () => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} in={!trigger} direction="down">
      <AppBar style={{background:'#ffff', color:'#000'}}>
        <Toolbar>
          <h3>
            Compras en casa
          </h3>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default NavigationBar;