import React, { Fragment, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getChannelDocRef, getIsUserInChannel } from '../../../firebase/database';
import ChannelHeader from './ChannelHeader';
import ChannelMessages from './ChannelMessages';
import ChannelSender from './ChannelSender';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setShowChannelJoinModal } from '../../../redux/actions';

export default function ChannelView () {
  const cid = useParams().cid;
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);
  const [channelData, fetching] = useDocumentData(getChannelDocRef(cid));
  const [verifiedAccess, setVerifiedAccess] = useState(true);

  useEffect(() => {
    if (!channelData || !userData?.uid || !cid) return;
    setVerifiedAccess(false);
    getIsUserInChannel(userData?.uid, cid)
      .then((isInChannel) => {
        (isInChannel)
          ? setVerifiedAccess(true)
          : dispatch(setShowChannelJoinModal(channelData));
      })
  }, [channelData, dispatch, userData?.uid, cid])

  // Display error or info message if fetching or channelId not given or channelData does not exist
  if (!verifiedAccess || fetching || !cid || !channelData ) return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {(fetching || !verifiedAccess) ? (
        (!fetching) ? (
          <NoPermChannel />
        ) : (
          <CircularProgress title='Loading' />
        )
      ) : (
        (!channelData && cid) ? (
          // Channel data does not exist but cid was given
          <UnknownChannel />
        ) : (
          <NoChannelSelected />
        )
      )}
    </Box>
  )
  // Returning regular view
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChannelHeader channelData={channelData} />
      <ChannelMessages channelData={channelData} />
      <ChannelSender cid={cid} />
    </Box>
  )
}

function NoChannelSelected () {
  return (
    <Fragment>
      <Typography variant='h1' align='center'>
        {'🤷‍♀️'}
      </Typography>
      <Typography variant='h4' align='center' my={2}>
        {'Feels pretty empty in here.'}
      </Typography>
      <Typography variant='h5' align='center' color='secondary'>
        {'You can make it less empty by selecting or creating a channel on the left.'}
      </Typography>
    </Fragment>
  )
}

function UnknownChannel () {
  return (
    <Fragment>
      <Typography variant='h4' align='center' color='error'>
        {'Channel not found.'}
      </Typography>
    </Fragment>
  )
}

function NoPermChannel () {
  return (
    <Fragment>
      <Typography variant='h4' align='center' color='error'>
        {'You are not apart of this channel.'}
      </Typography>
    </Fragment>
  )
}
