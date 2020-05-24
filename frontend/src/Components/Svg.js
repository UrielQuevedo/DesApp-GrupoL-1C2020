import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ xlink }) => {
  return (
    <svg width="20" height="20">
      <use xlinkHref={xlink} />
    </svg>
  );
}
Svg.prototype = {
  xlink: PropTypes.string.isRequired
}

export default Svg;