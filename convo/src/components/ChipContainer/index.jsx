import React from 'react';
import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * A div that contains Material UI chips
 */
export default function ChipContainer ({ children, width, maxHeight = '96px', sx }) {
  const theme = useTheme();
  const chipContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignItems: 'center',
    width,
    minHeight: '32px',
    maxHeight,
    overflowY: (maxHeight) ? 'auto' : '',
    m: '5px 0px',
    p: '5px',
    borderRadius: '20px',
    rowGap: '8px',
    border: `1px solid ${theme.palette.contrastColor}`,
    bgcolor: 'bgColor.main',
    ...sx
  }

  return (
    <Box sx={chipContainerStyle}>
      {children}
    </Box>
  )
}

ChipContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.string,
  maxHeight: PropTypes.string,
  style: PropTypes.object
};
