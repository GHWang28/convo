import React, { useEffect, useState } from 'react';
import { Avatar, Box, Chip, Collapse, Divider } from '@mui/material';
import { getUser } from '../../firebase/database';
import config from '../../config.json';
import { parseRGB } from '../../helpers';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

export default function NotificationBubble ({ notificationData, color }) {
  const [sender, setSender] = useState(null);
  const colorParse = parseRGB(color);
  const channelNotificationToggle = useSelector(state => state.channelNotification);

  useEffect(() => {
    getUser(notificationData?.uid)
      .then((userData) => {
        setSender(userData);
      })
  }, [notificationData?.uid]);

  const { label, icon, avatar } = generateNotificationMessage(notificationData.nid, sender?.handle, sender?.profilePic);

  return (
    <Collapse in={channelNotificationToggle}>
      <Box
        my={0.5}
        px={3}
        sx={{ boxSizing: 'border-box', width: '100%' }}
      >
        <Divider sx={{ '&::before, &::after': { borderColor: color, opacity: 0.5 } }}>
          <Chip
            icon={icon}
            avatar={avatar}
            label={label}
            size='medium'
            sx={{
              fontWeight: 'bold',
              bgcolor: `rgba(${colorParse[0]},${colorParse[1]},${colorParse[2]},0.25)`,
              color: 'whitesmoke',
              border: `1px solid ${color}`,
              fontSize: 'min(2.6vw, 14px)'
            }}
          />
        </Divider>
      </Box>
    </Collapse>
  )
}

function generateNotificationMessage (nid, handle, profilePic) {
  const avatarProps = { alt: handle, title: handle, src: profilePic || `${process.env.PUBLIC_URL}/images/default-dp-white.svg` }
  switch (nid) {
    case config.CHANNEL_EDIT_NID: return {
      label: `${handle} edited the Channel settings.`,
      icon: <EditIcon />
    }
    case config.CHANNEL_JOIN_NID: return {
      label: `${handle} joined the Channel.`,
      avatar: <Avatar {...avatarProps}/>
    }
    case config.CHANNEL_LEAVE_NID: return {
      label: `${handle} left the Channel.`,
      avatar: <Avatar {...avatarProps} sx={{ filter: 'grayscale(1)' }}/>
    }
    default: return {
      label: 'Unrecognised Channel Announcement.',
    }
  }
}
