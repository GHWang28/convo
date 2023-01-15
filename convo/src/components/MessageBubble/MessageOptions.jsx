import React from 'react';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { deleteMessage } from '../../firebase/database';
import { toast } from 'react-toastify';

export default function MessageOptions ({ position, isSender, color = 'whitesmoke', messageData }) {

  let options = [
    {
      label: 'Add Reaction',
      icon: <AddReactionOutlinedIcon />
    },
  ]

  if (isSender) {
    options = options.concat([
      {
        label: 'Edit Message',
        icon: <EditOutlinedIcon />
      },
      {
        label: 'Delete Message',
        icon: <DeleteOutlineOutlinedIcon />,
        onClick: () => {
          deleteMessage(messageData?.cid, messageData?.mid)
            .then(() => {
              toast.success('Deleted message successfully.')
            })
            .catch(() => {
              toast.error('Error in deleting message.')
            })
        }
      }
    ])
  }

  return (
    <Box sx={{ position: 'absolute', ...position, zIndex: 2 }}>
      {options.map((optionItem) => (
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
    </Box>
  )
}