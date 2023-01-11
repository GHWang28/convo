import React, { Fragment } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import ChannelCreateModal from '../../components/Modal/ChannelCreateModal';
import LogOutModal from '../../components/Modal/LogOutModal';
import ChannelTray from './ChannelTray';
import ChannelView from './ChannelView';
import ChannelSearchModal from '../../components/Modal/ChannelSearchModal';
import ChannelInfoModal from '../../components/Modal/ChannelInfoModal';
import ChannelEditModal from '../../components/Modal/ChannelEditModal';
import ChannelJoinModal from '../../components/Modal/ChannelJoinModal';

export default function ChannelsPage () {

  return (
    <Fragment>
      <Header />
      <LogOutModal />
      <ChannelJoinModal />
      <ChannelCreateModal />
      <ChannelSearchModal />
      <ChannelInfoModal />
      <ChannelEditModal />
      <Box
        sx={{
          width: '100vw',
          height: '98vh',
          display: 'flex'
        }}
      >
        <ChannelTray />
        <ChannelView />
      </Box>
    </Fragment>
  )
}