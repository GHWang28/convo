import { Alert, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Modal from '..';
import { leaveUserFromChannel } from '../../../firebase/database';
import {  setShowChannelLeaveModal } from '../../../redux/actions';

export default function ChannelLeaveModal () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.loggedInUserData);
  const channelData = useSelector(state => state.channelLeaveModal);

  const onClose = () => {
    dispatch(setShowChannelLeaveModal(null));
  }

  const onConfirm = () => {
    navigate('/channels');
    leaveUserFromChannel(userData?.uid, channelData?.cid, true);
    onClose();
  }
  
  return (
    <Modal
      open={Boolean(channelData)}
      title={`Leave "${channelData?.name}"`}
      handleClose={onClose}
      handleConfirm={onConfirm}
      confirmColor='error'
      fullWidth
    >
      <Typography align='center' fontSize={20}>
        {'Would you like to leave this channel?'}
      </Typography>
      {(!channelData?.publicMode) && (
        <Alert severity='warning' sx={{ mt: 2 }}>
          <Typography>
            {'If you leave a private server, you will need to be invited back in.'}
          </Typography>
        </Alert>
      )}
    </Modal>
  )
}