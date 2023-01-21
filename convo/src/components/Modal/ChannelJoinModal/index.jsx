import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { joinUserToChannel } from '../../../firebase/database';
import { setShowChannelJoinModal } from '../../../redux/actions';

export default function ChannelJoinModal () {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);
  const channelData = useSelector(state => state.channelJoinModal);
  const totalMembers = (channelData) ? Object.keys(channelData?.cidToUid).length : 0;

  const onClose = () => {
    dispatch(setShowChannelJoinModal(null));
  }

  const onConfirm = () => {
    joinUserToChannel(userData?.uid, channelData?.cid, true);
    onClose();
  }
  
  return (
    <Modal
      open={Boolean(channelData)}
      title={(channelData?.publicMode) ? `Join "${channelData?.name}"` : 'Private Channel'}
      subtitle='Meeting new people'
      handleClose={onClose}
      handleConfirm={(channelData?.publicMode) && onConfirm}
      confirmColor='success'
      fullWidth
    >
      {(channelData?.publicMode) ? (
        <Fragment>
          <Typography fontWeight='bold' ml={1} mb={1}>
          {'Channel Description'}
          </Typography>
          <Typography p={2} sx={{ bgcolor: 'mainColorDark', borderRadius: '5px' }}>
            {channelData?.description || 'No Channel Description.'}
          </Typography>
          <Box component='hr' my={2} />
          <Typography align='center' mt={2} fontSize={20}>
            {'Would you like to join this channel?'}
          </Typography>
          <Typography align='center' my={1} fontSize={15}>
            {`This channel has ${totalMembers} other participant${(totalMembers) ? '' : 's'} currently.`}
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          <Typography ml={1} mb={1} align='center' fontSize={20}>
            {'This is a '}<b>{'Private'}</b>{' Channel.'}
          </Typography>
          <Typography ml={1} mb={1} align='center' fontSize={15}>
            {'To be able to join Private channels, you will need to ask someone in this channel to invite you.'}
          </Typography>
        </Fragment>
      )}
      
    </Modal>
  )
}