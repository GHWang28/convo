import React, { useState, useEffect } from 'react';
import { Box, Chip } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { Emoji } from 'emoji-picker-react';
import { getUser, postDelMessageReact } from '../../firebase/database';
import { animated, useTransition } from 'react-spring';

export default function EmojiTrain ({ messageData, viewerUID }) {
  // Sort by most reactions
  const allReactions = Object.keys(messageData?.reactions).sort((ridA, ridB) => (
    Object.keys(messageData?.reactions[ridB]).length - Object.keys(messageData?.reactions[ridA]).length
  ))

  return (
    <Box sx={{ bgcolor: 'mainColorDark', width: 'fit-content', borderRadius: '15px', mt: 1 }}>
      {allReactions.map((rid) => (
        <EmojiChip key={rid} rid={rid} messageData={messageData} viewerUID={viewerUID}/>
      ))}
    </Box>
  )
}

function EmojiChip ({ messageData, rid, viewerUID }) {
  const [reactors, setReactors] = useState('');

  // Get reactor's handlers
  useEffect(() => {
    Promise.all(Object.keys(messageData?.reactions[rid]).map(async (uid) => (
      getUser(uid)
        .then((userData) => (userData?.handler))
    )))
    .then((allUsers) => {
      allUsers.sort();
      setReactors(allUsers.join(', '));
    })
  }, [messageData?.reactions, rid]);

  const transition = useTransition(Object.keys(messageData?.reactions[rid]).length, {
    from: { scale: 0, position: 'absolute' },
    enter: { scale: 1, position: 'static' },
    leave: { scale: 0, position: 'absolute' },
  });
  const AnimatedChip = animated(Chip);

  return (
    <BootstrapTooltip title={reactors} placement='top'>
      {transition((style, totalReacts) => (
        (totalReacts === 0) ? (
          null
        ) : (
          <AnimatedChip
            style={style}
            sx={{ pl: 1 }}
            icon={<Emoji unified={rid} emojiStyle='google' size={20}/>}
            label={totalReacts}
            variant='outlined'
            onClick={() => {
              postDelMessageReact(
                messageData?.cid,
                messageData?.mid,
                viewerUID,
                rid,
                Boolean(!messageData?.reactions?.[rid]?.[viewerUID])
              );
            }}
          />
        )
      ))}
    </BootstrapTooltip>
  )
}
