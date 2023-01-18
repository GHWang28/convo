import React from 'react';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ButtonMenu from '../ButtonMenu';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMessageDeleteModal } from '../../redux/actions';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { postDelMessageReact } from '../../firebase/database';


export default function MessageOptions ({ position, isSender, color = 'whitesmoke', messageData }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);
  let options = [
    {
      label: 'Edit Message',
      icon: <EditOutlinedIcon />
    },
    {
      label: 'Delete Message',
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: () => {
        dispatch(setShowMessageDeleteModal(messageData))
      }
    }
  ]

  return (
    <Box sx={{ position: 'absolute', ...position, zIndex: 2 }}>
      {isSender && options.map((optionItem) => (
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
          "&:hover, &.Mui-focusVisible": {
            bgcolor: 'mainColorLight'
          }
        }}
      >
        <Picker
          data={data}
          onEmojiSelect={(emojiData) => {
            postDelMessageReact(
              messageData?.cid,
              messageData?.mid,
              userData?.uid,
              emojiData?.id,
              Boolean(!messageData?.reactions?.[emojiData?.id]?.[userData?.uid])
            );
          }}
        />
      </ButtonMenu>
    </Box>
  )
}

/*
<EmojiPicker
  suggestedEmojisMode='recent'
  lazyLoadEmojis={true}
  autoFocusSearch={false}
  theme='dark'
  emojiStyle='native'
  onEmojiClick={}
/>
*/