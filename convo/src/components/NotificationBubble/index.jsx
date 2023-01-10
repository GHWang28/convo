import React, { useEffect, useState } from 'react';
import { Box, Chip, Divider } from '@mui/material';
import { getUser } from '../../firebase/database';
import config from '../../config.json';
import { getTextColor } from '../../helpers';

export default function NotificationBubble ({ notificationData, color }) {
  const [sender, setSender] = useState(null);
  const textColor = getTextColor(color);

  useEffect(() => {
    getUser(notificationData?.uid)
      .then((userData) => {
        setSender(userData);
      })
  }, [notificationData?.uid]);

  return (
    <Box
      my={0.25}
      px={3}
      sx={{
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      <Divider sx={{ '&::before, &::after': { borderColor: 'contrastColor' } }}>
        <Chip
          sx={{
            fontWeight: 'bold',
            bgcolor: color,
            color: textColor,
            border: `1px solid ${textColor}`
          }}
          label={generateNotificationMessage(notificationData.nid, sender?.handler)}
        />
      </Divider>
    </Box>
  )
}

function generateNotificationMessage (nid, name) {
  switch (nid) {
    case config.CHANNEL_EDIT_NID: return `
      ${name} edited the Channel settings
    `
    default: return 'Unrecognised channel activity'
  }
}
