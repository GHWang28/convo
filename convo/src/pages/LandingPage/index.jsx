import React, { Fragment } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import LandingCard from './LandingCard';
import Logo from './Logo';
import VersionNumber from '../../components/VersionNumber';
import EditUserModal from '../../components/Modal/UserModal/EditUserModal';

export default function LandingPage () {
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Fragment>
      <EditUserModal />
      <Box p={5} sx={{ width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
        <Grid container sx={{ width: '100%', height: '100%' }}>
          <Grid item xs={12} lg={6.5}>
            <Logo />
          </Grid>
          <Grid item xs={12} lg={5.5} sx={{ display: 'flex', justifyContent: 'center' }} py={(largeMq) ? 10 : 0}>
            <LandingCard />
          </Grid>
        </Grid>
        <VersionNumber position='fixed' />
      </Box>
    </Fragment>
  )
}