import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { setShowChannelInfoModal } from '../../../redux/actions';

export default function ChannelInfoModal () {
  const dispatch = useDispatch();
  const displayInfo = useSelector(state => state.channelInfoModal);

  const onClose = () => {
    dispatch(setShowChannelInfoModal(false));
  }
  
  return (
    <Modal
      open={displayInfo?.show}
      title={`${displayInfo?.name}`}
      subtitle={`#${displayInfo?.cid}`}
      handleClose={onClose}
      fullWidth
    >
      <Typography p={2} sx={{ bgcolor: 'mainColorDark', borderRadius: '5px' }}>
        {displayInfo?.description || 'No Channel Description.'}
      </Typography>
      <Typography fontWeight='bold'>
        {(displayInfo?.publicMode) ? 'Public' : 'Private'}
        {' Channel'}
      </Typography>
    </Modal>
  )
}