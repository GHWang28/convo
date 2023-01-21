import React, { useState } from 'react';
import packageJSON from '../../../package.json';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function VersionNumber ({ position = 'absolute' }) {
  const [hover, setHover] = useState(false);
  
  return (
    <Typography
      fontSize={14}
      fontFamily='Sofia Sans'
      fontWeight='bold'
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      sx={{ position, bottom: '5px', left: '5px', opacity: (hover) ? 1.0 : 0.5, transition: 'opacity 0.5s ease-in-out' }}
    >
      {`v${packageJSON.version}`}
    </Typography>
  )
}

VersionNumber.propTypes = {
  position: PropTypes.string
};
