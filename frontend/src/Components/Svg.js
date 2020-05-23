import React from 'react';

const Svg = ({ xlink }) => {
  return (
    <svg width="20" height="20">
      <use xlinkHref={xlink} />
    </svg>
  );
}

export default Svg;