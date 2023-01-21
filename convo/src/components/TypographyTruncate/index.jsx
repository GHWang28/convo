import React from 'react';
import { Box, Typography } from '@mui/material';

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