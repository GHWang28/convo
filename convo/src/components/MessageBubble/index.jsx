import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, isUrlToImage } from '../../firebase/database';
import { setImageZoom } from '../../redux/actions';
import DateDisplay from '../DateDisplay';
import TypographyTruncate from '../TypographyTruncate';

export default function MessageBubble ({ messageData, publicMode, arrow }) {
  const [sender, setSender] = useState(null);
  const [hover, setHover] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const dispatch = useDispatch();
  const viewerIsSender = (useSelector(state => state.loggedInUserData)?.uid === sender?.uid);

  useEffect(() => {
    getUser(messageData?.uid)
      .then((userData) => {
        setSender(userData);
        return isUrlToImage(messageData?.text);
      }).then((status) => {
        setIsImg(status);
      })
  }, [messageData?.uid, messageData?.text]);

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
          pt: 1,
          px: 2
        }}
      >
        {(arrow) && <MessageTail publicMode={publicMode} right={viewerIsSender} />}
        <TypographyTruncate
          width='50%'
          text={sender?.handler}
          sx={{ fontWeight: 'bold' }}
        />
        {(isImg) ? (
          <Box
            component='img'
            mt={2}
            src={messageData?.text}
            onClick={() => {
              dispatch(setImageZoom(messageData?.text))
            }}
            sx={{
              borderStyle: 'solid',
              borderWidth: '1px',
              borderRadius: '5px',
              borderColor: (publicMode) ? 'publicColor' : 'privateColor',
              maxHeight: '500px',
              maxWidth: '100%',
              cursor: 'pointer',
              transition: 'scale 0.25s ease-in-out',
              '&:hover': {
                scale: '1.02'
              }
            }}
          />
        ) : (
          <Typography sx={{ wordBreak: 'break-word' }}>
            {messageData?.text}
          </Typography>
        )}
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

