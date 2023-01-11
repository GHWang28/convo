import React, { useEffect, useState } from 'react';
import { Box, Chip, Divider } from '@mui/material';
import { getUser } from '../../firebase/database';
import config from '../../config.json';
import { parseRGB } from '../../helpers';

export default function NotificationBubble ({ notificationData, color }) {
  const [sender, setSender] = useState(null);
  const colorParse = parseRGB(color);

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
      <Divider sx={{ '&::before, &::after': { borderColor: color, opacity: 0.5 } }}>
        <Chip
          sx={{
            fontWeight: 'bold',
            bgcolor: `rgba(${colorParse[0]},${colorParse[1]},${colorParse[2]},0.25)`,
            color: 'whitesmoke',
            border: `1px solid ${color}`
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
