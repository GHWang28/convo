import React, { Fragment, useEffect, useState } from 'react';
import { Box, CircularProgress, Collapse, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
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
import ProfilePic from '../ProfilePic';
import LinkifyWrapper from '../LinkifyWrapper';
import config from '../../config.json';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function MessageBubble ({ messageData, color, arrow, isStart = true, isEnd = true, showOptions = false }) {
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
      }).then(setIsImg);
  }, [messageData?.uid, messageData?.text]);

  const editedTimestamp = (messageData?.timestampEdit) ? (
    <BootstrapTooltip title={convertEpochToDate(messageData?.timestampEdit?.seconds || messageData?.timestampEdit, false)} placement='top'>
      <Typography component='span' fontSize={10} fontStyle='italic' color='secondary' sx={{ userSelect: 'none' }} mb={0.5} noWrap>
        {' [Edited]'}
      </Typography>
    </BootstrapTooltip>
  ) : (
    null
  )

  return (
    <Box
      sx={{
        pl: (viewerIsSender) ? ((smallMq) ? 8 : 0.5) : ((isStart) ? 0.5 : 6),
        pr: (viewerIsSender) ? ((isStart) ? 0.5 : 6) : ((smallMq) ? 8 : 0.5),
        pt: (isStart) && 1,
        pb: (isEnd) && 1,
        display: 'flex',
        flexDirection: (viewerIsSender) ? 'row-reverse' : 'row',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      {(isStart) && (
        <ProfilePic
          uid={sender?.uid}
          alt={sender?.handle}
          src={sender?.profilePic}
          sx={{
            width: 44,
            height: 44
          }}
        />
      )}
      {/* Message Box */}
      <Box
        sx={{
          bgcolor: (hover) ? 'mainColorSlightLight' : 'mainColorLight',
          position: 'relative',
          width: '100%',
          borderTopLeftRadius: (isStart) && '15px',
          borderTopRightRadius: (isStart) && '15px',
          borderBottomLeftRadius: (isEnd) && '15px',
          borderBottomRightRadius: (isEnd) && '15px'
        }}
        ml={(!viewerIsSender) && 2}
        mr={(viewerIsSender) && 2}
        pt={(isStart) && 1}
        pb={(isEnd) && 1}
        px={2}
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
      >
        {(arrow && isStart) && (
          <MessageTail right={viewerIsSender} />
        )}
        {(showOptions && hover) && (
          <MessageOptions
            isSender={viewerIsSender}
            position={{ top: -20, right: 0 }}
            messageData={messageData}
            setEdit={setEdit}
            setHover={setHover}
            color={color}
          />
        )}
        {(isStart) && (
          <Fragment>
            <TypographyTruncate
              width={'50%'}
              text={sender?.handle}
              sx={{
                fontWeight: 'bold',
                fontSize: 16,
                color: (viewerIsSender) ? color : 'secondary.main'
              }}
            />
            <DateDisplay time={messageData?.timestamp?.seconds || messageData?.timestamp} align='left'/>
            <Box component='hr' sx={{ opacity: 0.5, borderColor: color }} />
          </Fragment>
        )}
        {/* Date display */}
        {(!isStart) && (
          <Collapse in={hover} sx={{ mt: 0.5 }}>
            <DateDisplay time={messageData?.timestamp?.seconds || messageData?.timestamp} align='left'/>
          </Collapse>
        )}
        {/* Show as image or text */}
        {(edit) ? (
          <EditMode messageData={messageData} setEdit={setEdit}/>
        ) : (
          <Fragment>
            {(isImg) ? (
              <BubbleImage src={messageData?.text} color={color}/>
            ) : (
              <Typography
                fontSize={(smallMq) ? '15px' : '13px'}
                fontStyle={(Boolean(messageData?.timestampEdit)) ? 'italic' : 'normal' }
                sx={{ wordBreak: 'break-word', userSelect: 'none' }}
              >
                <LinkifyWrapper>
                  {messageData?.text}
                </LinkifyWrapper>
                {/* Timestamp */}
                {(messageData?.text.length !== 0) && (
                  editedTimestamp
                )}
              </Typography>
            )}
          </Fragment>
        )}
        {(messageData?.image) && (
          <BubbleImage src={messageData?.image} color={color}/>
        )}
        {(messageData?.text.length === 0) && (
          editedTimestamp
        )}
        <EmojiTrain viewerUID={viewerUID} messageData={messageData} color={color} interactable={showOptions}/>
      </Box>
    </Box>

  )
}

MessageBubble.propTypes = {
  messageData: PropTypes.object,
  color: PropTypes.string,
  arrow: PropTypes.bool,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  showOptions: PropTypes.bool
}

function MessageTail ({ right }) {
  return (
    <Box
      component='span'
      sx={{
        width: '15px',
        height: '15px',
        position: 'absolute',
        display: '',
        bgcolor: 'inherit',
        rotate: (right) ? '-135deg' : '45deg',
        top: 14,
        left: (!right) && -6,
        right: (right) && -6
      }}
    />
  )
}

MessageTail.propTypes = {
  right: PropTypes.bool
}

function BubbleImage ({ src, color }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  }

  const onClick = () => { dispatch(setImageZoom(src)) }

  return (
    <Fragment>
      {(!loaded) && (
        <Box p={5} sx={{ color, borderRadius: '15px', width: 'fit-content', height: 'fit-content', bgcolor: 'mainColorDark' }}>
          <CircularProgress title='Loading' color='inherit' />
        </Box>
      )}
      <Box
        component='img'
        my={1}
        src={src}
        onLoad={onLoad}
        onClick={onClick}
        alt='Attached file'
        sx={[
          (!loaded) && { display: 'none' },
          {
            WebkitTapHighlightColor: 'transparent',
            border: `1px solid ${color}`,
            borderRadius: '15px',
            maxHeight: 'min(350px, 50vh)',
            maxWidth: 'min(350px, 100%)',
            cursor: 'pointer',
            transition: 'scale 0.25s ease-in-out',
            '&:hover': { scale: '1.02' }
          }
        ]}
      />
    </Fragment>
  )
}

BubbleImage.propTypes = {
  src: PropTypes.string.isRequired,
  color: PropTypes.string
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
    if (message.trim() === messageData?.text?.trim()) {
      onCancel();
      return;
    }
    if (message.length === 0) {
      dispatch(setShowMessageDeleteModal({ ...messageData, color }));
      return;
    }
    if (message.length > config.MAX_CHAR) {
      toast.error(`The new message is too long and exceeds ${config.MAX_CHAR} characters`);
      return;
    }
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

EditMode.propTypes = {
  messageData: PropTypes.object,
  setEdit: PropTypes.func.isRequired,
  color: PropTypes.string
}
