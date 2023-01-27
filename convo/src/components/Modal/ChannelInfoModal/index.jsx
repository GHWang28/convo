import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { getUser } from '../../../firebase/database';
import { convertEpochToDate } from '../../../helpers';
import { setShowChannelInfoModal } from '../../../redux/actions';
import ProfilePic from '../../ProfilePic';
import TagDisplay from '../../TagDisplay';

export default function ChannelInfoModal () {
  const dispatch = useDispatch();
  const displayInfo = useSelector(state => state.channelInfoModal);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUser(displayInfo?.creatorUid).then(setUserData);
  }, [displayInfo?.creatorUid, displayInfo?.show])

  const onClose = () => {
    dispatch(setShowChannelInfoModal(false));
  }
  const onExited = () => {
    setUserData(null);
  }

  const subtitle = ((displayInfo?.publicMode) ? 'Public Channel' : 'Private Channel') + ` created on ${convertEpochToDate(displayInfo?.dateCreated)}`
  
  return (
    <Modal
      open={displayInfo?.show}
      title={`${displayInfo?.name}`}
      subtitle={subtitle}
      handleClose={onClose}
      onExited={onExited}
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
      {(Boolean(userData)) && (
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <Typography align='center'>
            <Box component='span' fontWeight='bold'>
              {'Channel Creator: '}
            </Box>
            {userData?.handle}
          </Typography>
          <ProfilePic src={userData?.profilePic} uid={displayInfo?.creatorUid} alt={userData?.handle} sx={{ width: '50px', height: '50px' }} />
        </Box>
      )}
      <TagDisplay label={'Channel Tag'} tag={displayInfo?.tag} color={displayInfo?.theme} />
    </Modal>
  )
}