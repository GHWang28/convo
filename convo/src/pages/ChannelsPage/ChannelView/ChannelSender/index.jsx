import React, { useState } from 'react';
import { Box, Collapse, IconButton, LinearProgress, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { postMessage } from '../../../../firebase/database';
import { useSelector } from 'react-redux';
import config from '../../../../config.json';
import { toast } from 'react-toastify';
import ImageUploader from '../../../../components/ImageUploader';

export default function ChannelSender ({ cid }) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState([]);
  const [sending, setSending] = useState(false);
  const messagePercentage = 100 * message.length / config.MAX_CHAR;
  const userData = useSelector(state => state.loggedInUserData);

  const onSend = () => {
    if (!(message || image.length)) return;
    if (messagePercentage >= 100) {
      toast.error('Message is too long to send.');
      return;
    }

    setMessage('');
    setSending(true);
    postMessage(cid, userData.uid, { text: message, image: image[0]?.dataURL || '' })
      .then(() => {
        // Delay before scrolling down
        return new Promise((resolve) => (setTimeout(resolve, 5)))
      })
      .then(() => {
        const msgContainer = document.getElementById('message-container');
        msgContainer.scrollTo({ top: msgContainer.scrollHeight, behavior: 'smooth' });
      })
      .finally(() => {
        setSending(false);
        setImage([]);
      })
  }

  return (
    <Box
      sx={{
        width: '100%',
        p: 1,
        boxSizing: 'border-box',
        bgcolor: 'mainColorLight',
        boxShadow: '0 0 30px rgba(0,0,0,1)',
        clipPath: 'inset(-100vh 0px 0px 0px)'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <ImageUploader image={image} onChange={setImage} />
        <TextField
          sx={{ flexGrow: 1 }}
          InputProps={{ sx: { bgcolor: 'mainColorDark' } }}
          size='small'
          onChange={(event) => { setMessage(event.target.value) }}
          placeholder='Send message'
          value={message}
          multiline
          maxRows={5}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onSend();
            }
          }}
        />
        <Collapse in={Boolean(message.length || image.length)} orientation='horizontal'>
          <IconButton color='secondary' onClick={onSend} sx={{ borderWidth: '1px', borderRadius: 0, borderStyle: 'solid', borderColor: 'secondary' }}>
            <SendIcon />
          </IconButton>
        </Collapse>
      </Box>
      <Box sx={{ height: '7px', width: '100%', color: 'white', position: 'relative' }}>
        <LinearProgress
          color={(messagePercentage >= 100) ? 'error' : 'inherit'}
          sx={{ height: '7px' }}
          variant={(sending) ? 'indeterminate' : 'determinate'}
          value={Math.min(100, messagePercentage)}
        />
        <Typography fontSize={8} fontWeight='bold' sx={{ color: 'black', position: 'absolute', left: 5, top: -2.5 }}>
          {`${message.length} / ${config.MAX_CHAR} characters`}
        </Typography>
      </Box>
    </Box>
  )
}