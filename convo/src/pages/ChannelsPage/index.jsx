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
import ChannelLeaveModal from '../../components/Modal/ChannelLeaveModal';
import ChannelMemberModal from '../../components/Modal/ChannelMemberModal';
import MOTDModal from '../../components/Modal/MOTDModal';
import MessageDeleteModal from '../../components/Modal/MessageDeleteModal';
import UserModal from '../../components/Modal/UserModal';

export default function ChannelsPage () {

  return (
    <Fragment>
      <Header />
      <MOTDModal />
      <LogOutModal />
      <MessageDeleteModal />
      <ChannelMemberModal />
      <ChannelLeaveModal />
      <ChannelJoinModal />
      <ChannelCreateModal />
      <ChannelSearchModal />
      <ChannelInfoModal />
      <ChannelEditModal />
      <UserModal />
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