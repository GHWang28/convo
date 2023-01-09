import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { postMessage } from '../../../../firebase/database';
import { useSelector } from 'react-redux';

export default function ChannelSender ({ cid }) {
  const [message, setMessage] = useState('');
  const userData = useSelector(state => state.loggedInUserData);

  const onSend = () => {
    if (!message) return;

    setMessage('');
    postMessage(cid, userData.uid, message)
      .then(() => {
        // Delay before scrolling down
        return new Promise((resolve) => (setTimeout(resolve, 1)))
      })
      .then(() => {
        const msgContainer = document.getElementById('message-container');
        msgContainer.scrollTo({ top: msgContainer.scrollHeight, behavior: 'smooth' });
      });
  }

  return (
    <Box
      sx={{
        width: '100%',
        p: 1,
        boxSizing: 'border-box',
        bgcolor: 'mainColorLight',
        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
        clipPath: 'inset(-30px 0px 0px 0px)',
        display: 'flex'
      }}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        inputProps={{ sx: { bgcolor: 'mainColorDark' } }}
        onChange={(event) => { setMessage(event.target.value) }}
        value={message}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onSend();
          }
        }}
      />
      <Button variant='outlined' color='secondary' onClick={onSend}>
        <SendIcon />
      </Button>
    </Box>
  )
}