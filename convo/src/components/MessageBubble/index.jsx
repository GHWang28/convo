import { Avatar, Box, Collapse, Link, Typography, useMediaQuery } from '@mui/material';
import Linkify from 'linkify-react';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, isUrlToImage } from '../../firebase/database';
import { setImageZoom } from '../../redux/actions';
import BootstrapTooltip from '../BootstrapTooltip';
import DateDisplay from '../DateDisplay';
import TypographyTruncate from '../TypographyTruncate';

function padding (smallMq, isStart) {
  if (isStart) return 1;
  return (smallMq) ? 6 : 5;
}

export default function MessageBubble ({ messageData, color, arrow, isStart = true, isEnd = true }) {
  const dispatch = useDispatch();
  const [sender, setSender] = useState(null);
  const [hover, setHover] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const viewerIsSender = useSelector(state => state.loggedInUserData)?.uid === sender?.uid;

  useEffect(() => {
    getUser(messageData?.uid)
      .then((userData) => {
        setSender(userData);
        return isUrlToImage(messageData?.text);
      }).then(setIsImg)
  }, [messageData?.uid, messageData?.text]);

  return (
    <Box
      sx={{
        pl: (viewerIsSender) ? ((smallMq) ? 8 : 1) : padding(smallMq, isStart),
        pr: (viewerIsSender) ? padding(smallMq, isStart) : ((smallMq) ? 8 : 1),
        pt: (isStart) && 1,
        pb: (isEnd) && 1,
        display: 'flex',
        flexDirection: (viewerIsSender) ? 'row-reverse' : 'row',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      {(isStart) && (
        <Avatar
          alt={sender?.handler}
          src={sender?.profilePic}
          sx={{
            width: (smallMq) ? 40 : 32, height: (smallMq) ? 40 : 32, mt: (!smallMq) && 1
          }}
        />
      )}

      {/* Message Box */}
      <Box
        sx={{
          bgcolor: (hover) ? 'mainColorSlightLight' : 'mainColorLight',
          position: 'relative',
          width: '100%',
          ml: (!viewerIsSender) && 2,
          mr: (viewerIsSender) && 2,
          pt: (isStart) && 1,
          pb: (isEnd) && 1,
          px: 2,
          borderTopLeftRadius: (isStart) && '15px',
          borderTopRightRadius: (isStart) && '15px',
          borderBottomLeftRadius: (isEnd) && '15px',
          borderBottomRightRadius: (isEnd) && '15px'
        }}
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
      >
        {(arrow && isStart) && <MessageTail hover={hover} right={viewerIsSender}/>}
        {(isStart) && (
          <Fragment>
            <TypographyTruncate
              width={'50%'}
              text={sender?.handler}
              sx={{ fontWeight: 'bold', fontSize: 12, color: 'secondary.main' }}
            />
            <Box component='hr' sx={{ opacity: 0.5, borderColor: color }} />
          </Fragment>
        )}
        {/* Show as image or text */}
        {(isImg) ? (
          <Box
            component='img'
            mt={2}
            src={messageData?.text}
            onClick={() => { dispatch(setImageZoom(messageData?.text)) }}
            sx={{
              border: `1px solid ${color}`,
              borderRadius: '15px',
              maxHeight: '500px',
              maxWidth: '100%',
              cursor: 'pointer',
              transition: 'scale 0.25s ease-in-out',
              '&:hover': { scale: '1.02' }
            }}
          />
        ) : (
          <Typography sx={{ wordBreak: 'break-word', width: 'fit-content', display: 'inline-block'}}>
            <Linkify options={{ render: ({ attributes, content }) => {
              // Adds links to text that are potentially links
              const { href, ...props } = attributes;
              return (
                <BootstrapTooltip title={`Go to external page.`} placement='top'>
                  <Link href={href} target='_blank' {...props}>{content}</Link>
                </BootstrapTooltip>
              )
            }}}>
              {messageData?.text}
            </Linkify>
          </Typography>
        )}
        {/* Date display */}
        <Collapse in={hover}>
          <DateDisplay time={messageData?.timestamp?.seconds} align='right'/>
        </Collapse>
      </Box>
    </Box>

  )
}

function MessageTail ({ right, hover }) {
  return (
    <Box
      component='span'
      sx={{
        width: '15px',
        height: '15px',
        position: 'absolute',
        bgcolor: (hover) ? 'mainColorSlightLight' : 'mainColorLight',
        rotate: (right) ? '-135deg' : '45deg',
        top: 14,
        left: (!right) && -6,
        right: (right) && -6
      }}
    />
  )
}

