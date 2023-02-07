import React from 'react';
import { Box } from '@mui/system';
import { TypeAnimation } from 'react-type-animation';
import { Typography } from '@mui/material';

export default function Logo () {
  return (
    <Box sx={{ display: 'flex', color: 'rgb(255,255,255)', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        component='img'
        alt='Convo Logo Cups'
        src={process.env.PUBLIC_URL + '/images/logo/logo.png'}
        sx={{ height: 'min(20vw,15vh)' }}
      />
      <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', position: 'relative' }}>
        <Typography fontFamily={'Sofia Sans'} fontSize={'min(20vw,15vh)'} lineHeight={1} fontWeight='bold'>
          {'CONVO'}
        </Typography>
        <TypeAnimation
          sequence={[
            2000, 'Connect with your friends.',
            2000, 'Connect with your peers.',
            2000, 'Connect with your hermits.',
            2000, 'Connect with your family.',
            2000, 'Connect with your lover.',
            2000, 'Connect with your co-workers.',
            2000, 'Connect with your dungeon crawlers.',
            2000, 'Connect with your club.',
            2000, 'Connect with your mates.',
            2000, 'Connect with your enemies...?',
          ]}
          repeat={Infinity}
          style={{
            fontFamily: 'Sofia Sans',
            fontSize: 'min(3.73333333333vw,2.8vh)',
            marginLeft: '8px',
            bottom: 0
          }}
          wrapper='span'
        />
      </Box>
    </Box>
    
  )
}
