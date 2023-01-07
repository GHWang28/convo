import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import LogOutModal from '../../components/Modal/LogOutModal';
import ChannelTray from './ChannelTray';

export default function ChannelsPage () {

  return (
    <Fragment>
      <LogOutModal />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex'
        }}
      >
        <ChannelTray />
        <Typography>
          {'Heyheyhehyehyeyh'}
        </Typography>
      </Box>
    </Fragment>
  )
}