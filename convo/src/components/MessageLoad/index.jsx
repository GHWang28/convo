import { Box, LinearProgress, Typography } from '@mui/material';
import { Fragment } from 'react';

export default function MessageLoad ({ loading, color }) {
  const divider = <Box component='hr' sx={{ borderColor: color, width: '90%' }}/>;

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
        <LinearProgress color='inherit' sx={{ height: '20px', mx: 2, my: 3 }} />
      ) : (
        <Fragment>
          {divider}
          <Typography color='inherit' align='center' fontWeight='bold' my={3}>
            {'The Humble Beginnings of this Channel.'}
          </Typography>
          {divider}
        </Fragment>
      )}
    </Box>
  )
}
