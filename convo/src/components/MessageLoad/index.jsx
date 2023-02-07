import React, { Fragment } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function MessageLoad ({ loading, color }) {
  const hrSx = { borderColor: color, width: '90%' };
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        height: 'fit-content',
        color
      }}
    >
      {(loading) ? (
        <LinearProgress title='Loading' color='inherit' sx={{ height: '20px', mx: 2, my: 3 }} />
      ) : (
        <Fragment>
          <Box component='hr' mt={5} sx={hrSx}/>
          <Typography color='inherit' align='center' fontWeight='bold' my={3}>
            {'The Humble Beginnings of this Channel.'}
          </Typography>
          <Box component='hr' mb={3} sx={hrSx}/>
        </Fragment>
      )}
    </Box>
  )
}

MessageLoad.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string
}
