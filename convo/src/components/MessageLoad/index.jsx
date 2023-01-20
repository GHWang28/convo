import { Box, LinearProgress, Typography } from '@mui/material';
import { Fragment } from 'react';

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
        <LinearProgress color='inherit' sx={{ height: '20px', mx: 2, my: 3 }} />
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
