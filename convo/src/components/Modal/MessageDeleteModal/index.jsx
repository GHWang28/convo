import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '..';
import { deleteMessage } from '../../../firebase/database';
import { setShowMessageDeleteModal } from '../../../redux/actions';
import MessageBubble from '../../MessageBubble';

export default function MessageDeleteModal () {
  const dispatch = useDispatch();
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const messageData = useSelector(state => state.messageDeleteModal);

  const onConfirm = () => {
    deleteMessage(messageData?.cid, messageData?.mid)
      .then(() => {
        toast.success('Message deleted successfully.');
      })
      .catch(() => {
        toast.error('Error in deleting message.');
      })
      .finally(() => {
        onClose();
      })
  }

  const onClose = () => {
    dispatch(setShowMessageDeleteModal(null));
  }
  
  return (
    <Modal
      open={Boolean(messageData)}
      title='Delete Message'
      handleConfirm={onConfirm}
      handleClose={onClose}
      confirmColor='success'
      fullWidth
      fullScreen={!smallMq}
    >
      <Typography fontSize={20}>
        {'Are you sure you want to delete this message?'}
      </Typography>
      <Box sx={{ width: '100%', minHeight: '100px', bgcolor: 'rgb(0,0,0)', borderRadius: '15px' }}>
        {(messageData) && (
          <MessageBubble isStart isEnd messageData={messageData} arrow/>
        )}
      </Box>
    </Modal>
  )
}