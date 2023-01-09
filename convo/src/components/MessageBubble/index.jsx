import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../firebase/database';
import DateDisplay from '../DateDisplay';
import TypographyTruncate from '../TypographyTruncate';

export default function MessageBubble ({ messageData, publicMode, arrow }) {
  const [sender, setSender] = useState(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    getUser(messageData?.uid)
      .then((userData) => {
        setSender(userData);
      })
  }, [messageData?.uid]);

  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        display: 'flex',
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
          ml: 2,
          p: 1,
          pl: 2
        }}
      >
        {(arrow) && <MessageTail publicMode={publicMode} />}
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

function MessageTail ({ publicMode }) {
  return (
    <Box
      sx={{
        width: '15px',
        height: '15px',
        position: 'absolute',
        bgcolor: 'mainColorDark',
        borderStyle: 'solid',
        borderWidth: '0px 0px 1px 1px',
        borderColor: (publicMode) ? 'publicColor' : 'privateColor',
        rotate: '45deg',
        top: 12,
        left: -8
      }}
    />
  )
}

