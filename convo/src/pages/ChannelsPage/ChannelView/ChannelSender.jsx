import React, { useState } from 'react';
import { Box, Collapse, IconButton, LinearProgress, linearProgressClasses, styled, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { postMessage } from '../../../firebase/database';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BootstrapTooltip from '../../../components/BootstrapTooltip';
import ButtonGifPicker from '../../../components/ButtonGifPicker';
import config from '../../../config.json';
import ChannelImageUploader from './ChannelImageUploader';

export default function ChannelSender ({ cid }) {
  const [message, setMessage] = useState('');
  const trimmedMessage = message.trim();
  const [image, setImage] = useState([]);
  const [sending, setSending] = useState(false);
  const messagePercentage = 100 * trimmedMessage.length / config.MAX_CHAR;
  const userData = useSelector(state => state.loggedInUserData);

  const onSend = () => {
    if (!(trimmedMessage || image.length)) return;
    if (messagePercentage >= 100) {
      toast.error('Message is too long to send.');
      return;
    }

    setMessage('');
    setImage([]);
    setSending(true);
    sendMessageToDatabase(trimmedMessage, image?.at(0)?.dataURL);
  }
  const onGifClick = (tenorImageObj) => {
    sendMessageToDatabase('', tenorImageObj?.url);
  }
  const sendMessageToDatabase = (inputMessage, imageURL) => {
    postMessage(cid, userData.uid, { text: inputMessage, image: imageURL || '' })
      .then(() => {
        // Delay before scrolling down
        return new Promise((resolve) => (setTimeout(resolve, 5)))
      }).then(() => {
        const msgContainer = document.getElementById('message-container');
        msgContainer.scrollTo({ top: msgContainer.scrollHeight, behavior: 'smooth' });
      }).finally(() => {
        setSending(false);
      })
  }

  return (
    <Box
      p={1}
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        bgcolor: 'mainColorLight',
        boxShadow: '0 0 30px rgba(0,0,0,1)',
        clipPath: 'inset(-100vh 0px 0px 0px)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'end' }}>
        <ChannelImageUploader image={image} onChange={setImage} />
        <TextField
          sx={{ flexGrow: 1 }}
          InputProps={{
            sx: { bgcolor: 'mainColorDark', height: '100%', borderRadius: 0 },
            endAdornment: (<ButtonGifPicker onGifClick={(tenorImageObj) => { onGifClick(tenorImageObj) }}/>)
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
        <Box>
          <Collapse in={Boolean(trimmedMessage.length || image.length)} orientation='horizontal'>
            <BootstrapTooltip title='Send Message' placement='top'>
              <IconButton color='secondary' onClick={onSend} sx={{ borderRadius: 0, bgcolor: 'mainColorSlightLight', width: '51px', height: '51px' }}>
                <SendIcon />
              </IconButton>
            </BootstrapTooltip>
          </Collapse>
        </Box>
      </Box>
      <Box sx={{ height: '7px', width: '100%', position: 'relative' }}>
        <Typography
          fontSize={8}
          fontWeight='bold'
          sx={{
            position: 'absolute',
            left: 1,
            top: '50%',
            translate: '0% -50%',
            zIndex: 2,
            mixBlendMode: 'difference',
            lineHeight: 1
          }}
        >
          {`${trimmedMessage.length} / ${config.MAX_CHAR} characters`}
        </Typography>
        <BorderLinearProgress
          title='Message Capacity'
          color={(messagePercentage >= 100) ? 'error' : 'inherit'}
          sx={{
            height: '7px',
            bgcolor: 'black'
          }}
          variant={(sending) ? 'indeterminate' : 'determinate'}
          value={Math.min(100, messagePercentage)}
        />
      </Box>
    </Box>
  )
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.mode === 'light' ? 'black' : 'whitesmoke',
  },
}));