import React from 'react';
import { Box, Grid } from '@mui/material';
import LoginRegisterCard from './LoginRegisterCard';

export default function LoginRegisterPage () {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid container sx={{ width: '85vw', height: '85vh' }}>
        <Grid item xs={12} lg={6}>

        </Grid>
        <Grid item xs={12} lg={6}>
          <LoginRegisterCard />
        </Grid>
      </Grid>
    </Box>
  )
}