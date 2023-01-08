import React, { Fragment, useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getChannel } from '../../../firebase/database';
import ChannelHeader from './ChannelHeader';

export default function ChannelView () {
  const cid = useParams().cid;
  const [fetching, setFetching] = useState(true);
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    if (!cid) {
      setFetching(false);
      return;
    }
    setFetching(true);
    getChannel(cid)
      .then((channelData) => {
        setChannelData(channelData);
      })
      .finally(() => {
        setFetching(false);
      })
  }, [cid]);

  // Display error or info message if fetching or channelId not given or channelData does not exist
  if (fetching || !cid || !channelData ) return (
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
      {(fetching) ? (
        <CircularProgress />
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
    <Box sx={{ width: '100%', height: '100%' }}>
      <ChannelHeader channelData={channelData} />
    </Box>
  )
}

function NoChannelSelected () {
  return (
    <Fragment>
      <Typography variant='h2' align='center'>
        {'¯\\_(ツ)_/¯'}
      </Typography>
      <Typography variant='h4' align='center'>
        {'Feels pretty empty in here.'}
      </Typography>
      <Typography variant='h5' align='center'>
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
