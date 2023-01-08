import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import ChannelCreateModal from '../../components/Modal/ChannelCreateModal';
import LogOutModal from '../../components/Modal/LogOutModal';
import ChannelTray from './ChannelTray';
import { useParams } from 'react-router-dom';
import ChannelView from './ChannelView';
import ChannelSearchModal from '../../components/Modal/ChannelSearchModal';

export default function ChannelsPage () {

  return (
    <Fragment>
      <LogOutModal />
      <ChannelCreateModal />
      <ChannelSearchModal />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex'
        }}
      >
        <ChannelTray />
        <ChannelView />
      </Box>
    </Fragment>
  )
}