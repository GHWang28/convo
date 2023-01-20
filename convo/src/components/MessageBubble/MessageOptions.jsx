import React from 'react';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ButtonMenu from '../ButtonMenu';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMessageDeleteModal } from '../../redux/actions';
import Picker from '@emoji-mart/react'
import { postDelMessageReact } from '../../firebase/database';


export default function MessageOptions ({ position, isSender, color = 'whitesmoke', messageData, setEdit }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);
  let options = [
    {
      label: 'Edit Message',
      icon: <EditOutlinedIcon />,
      onClick: () => {
        setEdit(true);
      }
    },
    {
      label: 'Delete Message',
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: () => {
        dispatch(setShowMessageDeleteModal({ ...messageData, color }))
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
          '&:hover, &.Mui-focusVisible': {
            bgcolor: 'mainColorLight'
          }
        }}
      >
        {({ onClose }) => (
          <Picker
            theme='dark'
            onEmojiSelect={(emojiData) => {
              postDelMessageReact(
                messageData?.cid,
                messageData?.mid,
                userData?.uid,
                emojiData?.id,
                Boolean(!messageData?.reactions?.[emojiData?.id]?.[userData?.uid])
              );
              onClose();
            }}
          />
        )}
        
      </ButtonMenu>
    </Box>
  )
}
