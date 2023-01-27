import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { setShowChannelInfoModal } from '../../../redux/actions';

export default function ChannelInfoModal () {
  const dispatch = useDispatch();
  const displayInfo = useSelector(state => state.channelInfoModal);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const onClose = () => {
    dispatch(setShowChannelInfoModal(false));
  }
  
  return (
    <Modal
      open={displayInfo?.show}
      title={`${displayInfo?.name}`}
      subtitle={(displayInfo?.publicMode) ? 'Public Channel' : 'Private Channel'}
      handleClose={onClose}
      fullWidth
      fullScreen={!smallMq}
    >
      <Box mb={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt={`${displayInfo?.name}`}
          sx={{ bgcolor: 'mainColorNormal', width: '300px', height: '300px' }}
          src={displayInfo?.channelPic || `${process.env.PUBLIC_URL}/images/default-channel-white.svg`}
        />
      </Box>
      <Typography p={2} sx={{ bgcolor: 'mainColorDark', borderRadius: '5px' }}>
        {displayInfo?.description || 'No Channel Description.'}
      </Typography>
      <Typography fontWeight='bold' mt={2} align='center'>
        {'Channel Tag: '}
        <Box component='span' sx={{ fontWeight: 'normal' }}>
          {`#${displayInfo?.tag}`}
        </Box>
      </Typography>
    </Modal>
  )
}