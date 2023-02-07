import React from 'react';
import { Box, TextField, useMediaQuery } from '@mui/material'
import { parseRGB } from '../../helpers';
import PropTypes from 'prop-types';

export default function TextInputRGB ({ color, setColor }) {
  const [r, g, b] = parseRGB(color);
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box sx={{ display: 'flex', gap: (mediumMq) ? 3 : 1}}>
      <TextField
        sx={{ my: 1 }}
        InputProps={{ sx: { bgcolor: 'mainColorNormal' }, inputProps: { min: 0, max: 255 }}}
        size='small'
        label='R'
        variant='outlined'
        fullWidth
        type='number'
        value={r || 0}
        onChange={(event) => { setColor(`rgb(${Math.min(255, Math.max(0, event.target.value || 0))},${g},${b})`) }}
      />
      <TextField
        sx={{ my: 1 }}
        InputProps={{ sx: { bgcolor: 'mainColorNormal' }, inputProps: { min: 0, max: 255 }}}
        size='small'
        label='G'
        variant='outlined'
        fullWidth
        type='number'
        value={g || 0}
        onChange={(event) => { setColor(`rgb(${r},${Math.min(255, Math.max(0, event.target.value || 0))},${b})`) }}
      />
      <TextField
        sx={{ my: 1 }}
        InputProps={{ sx: { bgcolor: 'mainColorNormal'}, inputProps: { min: 0, max: 255 }}}
        size='small'
        label='B'
        variant='outlined'
        fullWidth
        type='number'
        value={b || 0}
        onChange={(event) => { setColor(`rgb(${r},${g},${Math.min(255, Math.max(0, event.target.value || 0))})`) }}
      />
    </Box>
  )
}

TextInputRGB.propTypes = {
  color: PropTypes.string,
  setColor: PropTypes.func
};