import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Header () {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/channels');
  }

  return (
    <Box sx={{ height: '2vh', bgcolor: 'mainColorDark', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5 }} >
      <Box
        component='img'
        alt='Cup left'
        src={process.env.PUBLIC_URL + '/images/logo/logo-string.png'}
        sx={{
          WebkitTapHighlightColor: 'transparent',
          height: '1.5vh',
          opacity: 0.75,
          cursor: 'pointer'
        }}
        onClick={onClick}
      />
      <Typography
        role='button'
        align='center'
        fontWeight='bold'
        fontFamily='Sofia Sans'
        fontSize='1.4vh'
        sx={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent', }}
        onClick={onClick}
      >
        {'CONVO'}
      </Typography>
      <Box
        component='img'
        alt='Cup right'
        src={process.env.PUBLIC_URL + '/images/logo/logo-string.png'}
        sx={{
          WebkitTapHighlightColor: 'transparent',
          height: '1.5vh',
          opacity: 0.75,
          transform: 'scaleX(-1)',
          cursor: 'pointer'
        }}
        onClick={onClick}
      />
    </Box>
  )
}