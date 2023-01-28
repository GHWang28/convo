import React from 'react';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ButtonMenu from '../ButtonMenu';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMessageDeleteModal } from '../../redux/actions';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Picker from '@emoji-mart/react'
import { postDelMessageReact } from '../../firebase/database';
import { toast } from 'react-toastify';

export default function MessageOptions ({ position, isSender, color = 'whitesmoke', messageData, setEdit, setHover }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);
  const options = [
    (isSender) && {
      label: 'Edit Message',
      icon: <EditOutlinedIcon />,
      onClick: () => {
        setEdit(true);
      }
    },
    (isSender) &&  {
      label: 'Delete Message',
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: () => {
        dispatch(setShowMessageDeleteModal({ ...messageData, color }))
      }
    },
    {
      label: 'Copy Message Text',
      icon: <ContentPasteIcon />,
      onClick: () => {
        if (messageData.text.length === 0) {
          toast.error('This message does not have any text to copy.');
        } else {
          navigator.clipboard.writeText(messageData.text);
          toast.success('Copied to clipboard.');
        }
      }
    }
  ]

  return (
    <Box sx={{ position: 'absolute', ...position, zIndex: 2, display: 'flex', gap: 1 }}>
      {options.filter((optionItem) => (optionItem)).map((optionItem) => (
        <BootstrapTooltip key={optionItem.label} title={optionItem.label} placement='top'>
          <IconButton
            onClick={optionItem?.onClick}
            size='small'
            sx={{
              borderRadius: '5px',
              color,
              bgcolor: 'mainColorSlightLight',
              "&:hover, &.Mui-focusVisible": {
                bgcolor: 'mainColorLight'
              }
            }}
          >
            {optionItem.icon}
          </IconButton>
        </BootstrapTooltip>
      ))}
      {/* Reaction */}
      <ButtonMenu
        icon={<AddReactionOutlinedIcon />}
        title='Add Reaction'
        size='small'
        sx={{
          borderRadius: '5px',
          color,
          bgcolor: 'mainColorSlightLight',
          '&:hover, &.Mui-focusVisible': {
            bgcolor: 'mainColorLight'
          }
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => {
          setHover(false);
        }}
      >
        {({ onClose }) => (
          <Picker
            theme='dark'
            skinTonePosition='search'
            onEmojiSelect={(emojiData) => {
              postDelMessageReact(
                messageData?.cid,
                messageData?.mid,
                userData?.uid,
                emojiData?.shortcodes,
                // Checking if the user has reacted before
                Boolean(!messageData?.reactions?.[emojiData?.shortcodes]?.[userData?.uid])
              );
              onClose();
            }}
          />
        )}
      </ButtonMenu>
    </Box>
  )
}
