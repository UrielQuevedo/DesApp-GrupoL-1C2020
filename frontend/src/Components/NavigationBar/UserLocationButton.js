import React from 'react';
import { Button, Box, Hidden } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const UserLocationButton = () => {
  return (
    <Button className="userNavigation">
        <Hidden smDown>
          <LocationOnIcon />
        </Hidden>
        <Box textOverflow="ellipsis" className="address" overflow="hidden">
          quilmes, buenos aires
        </Box>
      <ArrowDropDownIcon />
    </Button>
  );
}

export default UserLocationButton;