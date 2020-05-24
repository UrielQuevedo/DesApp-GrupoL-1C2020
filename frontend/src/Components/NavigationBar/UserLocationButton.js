import React from 'react';
import { Button, Box } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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

export default UserLocationButton;