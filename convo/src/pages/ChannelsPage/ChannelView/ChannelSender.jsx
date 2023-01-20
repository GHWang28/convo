import React, { useState } from 'react';
import { Box, Collapse, IconButton, LinearProgress, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { postMessage } from '../../../firebase/database';
import { useSelector } from 'react-redux';
import config from '../../../config.json';
import { toast } from 'react-toastify';
import GifPicker from 'gif-picker-react';
import GifIcon from '@mui/icons-material/Gif';
import ImageUploader from '../../../components/ImageUploader';
import BootstrapTooltip from '../../../components/BootstrapTooltip';
import ButtonMenu from '../../../components/ButtonMenu';

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
    setImage([]);
    setSending(true);
    sendMessageToDatabase(message, image?.at(0)?.dataURL);
  }

  const onGifClick = (tenorImageObj) => {
    sendMessageToDatabase('', tenorImageObj?.url);
  }

  const sendMessageToDatabase = (inputMessage, imageURL) => {
    postMessage(cid, userData.uid, { text: inputMessage, image: imageURL || '' })
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
      <Box sx={{ display: 'flex', alignItems: 'end' }}>
        <ImageUploader image={image} onChange={setImage} />
        <TextField
          sx={{ flexGrow: 1 }}
          InputProps={{
            sx: { bgcolor: 'mainColorDark', height: '100%', borderRadius: 0 },
            endAdornment: (
              <ButtonMenu
                icon={<GifIcon />}
                title='Add Reaction'
                size='small'
                sx={{
                  bgcolor: 'mainColorSlightLight',
                  "&:hover, &.Mui-focusVisible": {
                    bgcolor: 'mainColorLight'
                  }
                }}
              >
                {({ onClose }) => (
                  <GifPicker
                    theme='dark'
                    tenorApiKey='AIzaSyA1416HVoCuhmF86AeK6nI2fAS3V8lD0Z0'
                    onGifClick={(tenorImageObj) => { onGifClick(tenorImageObj); onClose(); }}
                  />
                )}
              </ButtonMenu>
            )
          }}
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
        {/* Send Button that collapses in if there isn't anything to send */}
        <Collapse in={Boolean(message.length || image.length)} orientation='horizontal'>
          <BootstrapTooltip title='Send Message' placement='top'>
            <IconButton color='secondary' onClick={onSend} sx={{ borderRadius: 0, bgcolor: 'mainColorSlightLight', width: '51px', height: '51px' }}>
              <SendIcon />
            </IconButton>
          </BootstrapTooltip>
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