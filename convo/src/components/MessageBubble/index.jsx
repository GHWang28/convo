import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../firebase/database';
import DateDisplay from '../DateDisplay';
import TypographyTruncate from '../TypographyTruncate';

export default function MessageBubble ({ messageData, publicMode, arrow }) {
  const [sender, setSender] = useState(null);
  const [hover, setHover] = useState(false);
  const viewerIsSender = (useSelector(state => state.loggedInUserData)?.uid === sender?.uid);

  useEffect(() => {
    getUser(messageData?.uid)
      .then((userData) => {
        setSender(userData);
      })
  }, [messageData?.uid]);

  return (
    <Box
      sx={{
        pl: (viewerIsSender) ? 9 : 2,
        pr: (viewerIsSender) ? 2 : 9,
        py: 0.5,
        display: 'flex',
        flexDirection: (viewerIsSender) ? 'row-reverse' : 'row',
        boxSizing: 'border-box',
        width: '100%'
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
    >
      <Avatar alt={sender?.handler} src={sender?.profilePic} />
      {/* Message Box */}
      <Box
        sx={{
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: (publicMode) ? 'publicColor' : 'privateColor',
          bgcolor: 'mainColorDark',
          borderRadius: '5px',
          position: 'relative',
          ml: (!viewerIsSender) && 2,
          mr: (viewerIsSender) && 2,
          p: 1,
          pl: 2
        }}
      >
        {(arrow) && <MessageTail publicMode={publicMode} right={viewerIsSender} />}
        <TypographyTruncate
          width='50%'
          text={sender?.handler}
          sx={{ fontWeight: 'bold' }}
        />
        
        <Typography sx={{ wordBreak: 'break-word' }}>
          {messageData?.text}
        </Typography>
        <DateDisplay time={messageData?.timestamp?.seconds} align='right' shorten={!hover}/>
      </Box>
    </Box>

  )
}

function MessageTail ({ publicMode, right }) {
  return (
    <Box
      component='span'
      sx={{
        width: '15px',
        height: '15px',
        position: 'absolute',
        bgcolor: 'mainColorDark',
        borderStyle: 'solid',
        borderWidth: '0px 0px 1px 1px',
        borderColor: (publicMode) ? 'publicColor' : 'privateColor',
        rotate: (right) ? '-135deg' : '45deg',
        top: 12,
        left: (!right) && -8,
        right: (right) && -8
      }}
    />
  )
}

