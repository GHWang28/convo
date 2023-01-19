import React, { Fragment, useEffect, useState } from 'react';
import { Avatar, Box, Collapse, IconButton, Link, TextField, Typography, useMediaQuery } from '@mui/material';
import Linkify from 'linkify-react';
import { useDispatch, useSelector } from 'react-redux';
import { editMessage, getUser, isUrlToImage } from '../../firebase/database';
import { setImageZoom, setShowMessageDeleteModal } from '../../redux/actions';
import BootstrapTooltip from '../BootstrapTooltip';
import DateDisplay from '../DateDisplay';
import TypographyTruncate from '../TypographyTruncate';
import EmojiTrain from './EmojiTrain';
import MessageOptions from './MessageOptions';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { convertEpochToDate } from '../../helpers';

function padding (smallMq, isStart) {
  if (isStart) return 1;
  return (smallMq) ? 6 : 5;
}

export default function MessageBubble ({ messageData, color, arrow, isStart = true, isEnd = true, showOptions = false }) {
  const dispatch = useDispatch();
  const [sender, setSender] = useState(null);
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const viewerUID = useSelector(state => state.loggedInUserData)?.uid;
  const viewerIsSender = (viewerUID === sender?.uid);

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
        {(showOptions && hover) && (
          <MessageOptions
            isSender={viewerIsSender}
            position={{ top: -20, right: 0 }}
            messageData={messageData}
            setEdit={setEdit}
            color={color}
          />
        )}
        {(isStart) && (
          <Fragment>
            <TypographyTruncate
              width={'50%'}
              text={sender?.handler}
              sx={{ fontWeight: 'bold', fontSize: 14, color: 'secondary.main' }}
            />
            <DateDisplay time={messageData?.timestamp?.seconds || messageData?.timestamp} align='left'/>
            <Box component='hr' sx={{ opacity: 0.5, borderColor: color }} />
          </Fragment>
        )}
        {/* Date display */}
        {(!isStart) && (
          <Collapse in={hover}>
            <DateDisplay time={messageData?.timestamp?.seconds || messageData?.timestamp} align='left'/>
          </Collapse>
        )}
        {/* Show as image or text */}
        {(edit) ? (
          <EditMode messageData={messageData} setEdit={setEdit} color={color} />
        ) : (
          <Fragment>
            {(isImg) ? (
              <BubbleImage
                src={messageData?.text}
                onClick={() => { dispatch(setImageZoom(messageData?.text)) }}
                color={color}
              />
            ) : (
              <Typography
                fontStyle={(Boolean(messageData?.timestampEdit)) ? 'italic' : 'normal' }
                sx={{ wordBreak: 'break-word' }}
              >
                <Linkify
                  options={{ render: ({ attributes, content }) => {
                    // Adds links to text that are potentially links
                    const { href, ...props } = attributes;
                    return (
                      <BootstrapTooltip title={`Go to external page.`} placement='top'>
                        <Link href={href} target='_blank' {...props}>{content}</Link>
                      </BootstrapTooltip>
                    )
                  }}}
                >
                  {messageData?.text}
                </Linkify>
              </Typography>
            )}
          </Fragment>
        )}
        {(messageData?.image) && (
          <BubbleImage
            src={messageData?.image}
            onClick={() => { dispatch(setImageZoom(messageData?.image)) }}
            color={color}
          />
        )}
        {Boolean(messageData?.timestampEdit) && (
          <Typography fontSize={10} fontStyle='italic' color='secondary' mb={0.5}>
            {`[Edited on ${convertEpochToDate(messageData?.timestampEdit?.seconds)}]`}
          </Typography>
        )}
        <EmojiTrain viewerUID={viewerUID} messageData={messageData} color={color} interactable={showOptions}/>
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
        display: '',
        bgcolor: (hover) ? 'mainColorSlightLight' : 'mainColorLight',
        rotate: (right) ? '-135deg' : '45deg',
        top: 14,
        left: (!right) && -6,
        right: (right) && -6
      }}
    />
  )
}

function BubbleImage ({ onClick, src, color }) {
  return (
    <Box
      component='img'
      mt={2}
      src={src}
      onClick={onClick}
      alt='Bubble Image'
      sx={{
        border: `1px solid ${color}`,
        borderRadius: '15px',
        maxHeight: 'min(350px, 50vh)',
        maxWidth: 'min(350px, 50vw)',
        cursor: 'pointer',
        transition: 'scale 0.25s ease-in-out',
        '&:hover': { scale: '1.02' }
      }}
    />
  )
}

function EditMode ({ messageData, setEdit, color }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(messageData?.text);

  const onChange = (event) => {
    setMessage(event.target.value)
  }
  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onConfirm(event);
    }
  }
  const onConfirm = () => {
    if (message === messageData?.text) {
      onCancel();
      return;
    };
    if (message.length === 0) dispatch(setShowMessageDeleteModal({ ...messageData, color }));
    editMessage(message, messageData?.cid, messageData?.mid).then(onCancel);
  }
  const onCancel = () => {
    setEdit(false)
  }
  const onFocus = (event) => {
    const msgLength = event.target.value.length;
    event.target.setSelectionRange(msgLength, msgLength);
  }
  const onMouseDown = (event) => {
    event.preventDefault();
  }

  return (
    <TextField
      sx={{ my: 1 }}
      InputProps={{
        sx: { bgcolor: 'mainColorDark' },
        endAdornment: (
          <Box sx={{ display: 'flex' }}>
            <BootstrapTooltip title='Confirm Edit'>
              <IconButton size='small' color='success' onClick={onConfirm} onMouseDown={onMouseDown}>
                <CheckIcon />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title='Cancel Edit'>
              <IconButton size='small' color='error' onClick={onCancel} onMouseDown={onMouseDown}>
                <CloseIcon />
              </IconButton>
            </BootstrapTooltip>
          </Box>
        )
      }}
      size='small'
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onCancel}
      autoFocus
      label='Editing Message'
      placeholder='Keep empty to delete message'
      fullWidth
      value={message}
      multiline
      maxRows={5}
    />
  )
}