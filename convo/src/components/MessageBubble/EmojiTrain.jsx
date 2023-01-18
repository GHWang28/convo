import React, { useState, useEffect } from 'react';
import { Box, Chip } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { getUser, postDelMessageReact } from '../../firebase/database';
import { animated, useTransition } from 'react-spring';
import { getTextColor, parseRGB } from '../../helpers';

export default function EmojiTrain ({ messageData, viewerUID, color }) {
  if (!(messageData?.reactions && Object.keys(messageData?.reactions).length !== 0)) return null;
  
  return (
    <Box
      sx={{
        bgcolor: 'mainColorDark',
        width: 'fit-content',
        borderRadius: '20px',
        display: 'grid',
        maxWidth: '100%',
        gridTemplateColumns: 'repeat(auto-fit, minmax(60px, max-content))',
        justifyContent: 'left',
        alignItems: 'flex-start',
        gap: 0.4,
        p: 0.4
      }}
    >
      {messageData?.reactionsOrder.map((rid) => (
        <EmojiChip
          key={rid}
          rid={rid}
          reactionData={messageData?.reactions?.[rid]}
          cid={messageData?.cid}
          mid={messageData?.mid}
          viewerUID={viewerUID}
          color={color}
        />
      ))}
    </Box>
  )
}

function EmojiChip ({ reactionData, rid, cid, mid, viewerUID, color }) {
  const [r, g, b] = parseRGB(color);
  const [reactors, setReactors] = useState('');

  // Get reactor's handlers
  useEffect(() => {
    Promise.all(Object.keys(reactionData).map((uid) => (
      getUser(uid).then((userData) => (userData?.handler))
    ))).then((allUsers) => {
      allUsers.sort();
      setReactors(allUsers.join(', '));
    })
  }, [reactionData, rid, viewerUID]);

  const transition = useTransition(Object.keys(reactionData).length, {
    from: { rotateY: '90deg' },
    enter: { rotateY: '0deg' },
    leave: { rotateY: '-90deg' },
    config: {
      duration: 100
    },
    exitBeforeEnter: true
  });
  const AnimatedChip = animated(Chip);

  return transition((style, totalReacts) => (
    (totalReacts === 0) ? (
      null
    ) : (
      <BootstrapTooltip title={reactors} placement='top'>
        <AnimatedChip
          style={style}
          sx={{
            pl: 1,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'contrastColor',
            color: (reactionData?.[viewerUID]) ? getTextColor(color) : 'contrastColor',
            fontWeight: 'bold',
            bgcolor: (reactionData?.[viewerUID]) ? `rgba(${r},${g},${b},0.5)` : `rgba(${r},${g},${b},0.1)`,
            '&:hover': {
              bgcolor: (reactionData?.[viewerUID]) ? `rgba(${r},${g},${b},0.7)` : `rgba(${r},${g},${b},0.3)`
            }
          }}
          icon={<em-emoji id={rid} />}
          label={totalReacts}
          onClick={() => {
            postDelMessageReact(
              cid,
              mid,
              viewerUID,
              rid,
              Boolean(!reactionData?.[viewerUID])
            );
          }}
        />
      </BootstrapTooltip>
    )
  ))
}
