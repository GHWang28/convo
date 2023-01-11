import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Header () {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/channels');
  }

  return (
    <Box sx={{ height: '2vh', bgcolor: 'mainColorDark', display: 'flex', justifyContent: 'center' }} >
      <Typography
        role='button'
        align='center'
        fontWeight='bold'
        fontFamily='Sofia Sans'
        onClick={onClick}
        sx={{ cursor: 'pointer' }}
      >
        {'CONVO'}
      </Typography>
    </Box>
  )
}