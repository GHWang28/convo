import React from 'react';
import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function TextInput ({ icon, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {icon}
      <TextField label={label} variant='outlined' fullWidth sx={{ input: { color: 'red' } }}/>
    </Box>
  )
}

TextInput.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string
};

