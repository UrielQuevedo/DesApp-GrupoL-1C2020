import React from 'react';
import { Button, Box, Hidden } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';

const UserLocationButton = ({ address }) => {
  return (
    <Button className="userNavigation">
        <Hidden smDown>
          <LocationOnIcon />
        </Hidden>
        <Box textOverflow="ellipsis" className="address" overflow="hidden">
          { address }
        </Box>
      <ArrowDropDownIcon />
    </Button>
  );
}

export default UserLocationButton;