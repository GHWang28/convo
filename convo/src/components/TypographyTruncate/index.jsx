import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function TypographyTruncate ({ text, width, sx, ...props }) {
  return (
    <Box
      sx={{
        display: 'table',
        tableLayout: 'fixed',
        width
      }}
    >
      <Typography
        {...props}
        sx={{
          display: 'table-cell',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          ...sx
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}

TypographyTruncate.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  sx: PropTypes.object
};
