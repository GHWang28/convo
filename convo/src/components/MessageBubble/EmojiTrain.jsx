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
        mt: 1,
        p: 0.75
      }}
    >
      {messageData?.reactionsOrder.map((rid) => (
        <EmojiChip key={rid} rid={rid} messageData={messageData} viewerUID={viewerUID} color={color}/>
      ))}
    </Box>
  )
}

function EmojiChip ({ messageData, rid, viewerUID, color }) {
  const [r, g, b] = parseRGB(color);
  const [reactors, setReactors] = useState('');
  const [hasReacted, setHasReacted] = useState(false);

  // Get reactor's handlers
  useEffect(() => {
    setHasReacted(Boolean(messageData?.reactions?.[rid]?.[viewerUID]));
    Promise.all(Object.keys(messageData?.reactions[rid]).map((uid) => (
      getUser(uid).then((userData) => (userData?.handler))
    )))
    .then((allUsers) => {
      allUsers.sort();
      setReactors(allUsers.join(', '));
    })
  }, [messageData?.reactions, rid, viewerUID]);

  const transition = useTransition(Object.keys(messageData?.reactions[rid]).length, {
    from: { opacity: 0, position: 'static' },
    enter: { opacity: 1, position: 'static' },
    leave: { opacity: 0, position: 'static' },
    config: {
      duration: 200
    },
    exitBeforeEnter: true
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
            sx={{
              pl: 1,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'contrastColor',
              color: getTextColor(color),
              fontWeight: 'bold',
              bgcolor: (hasReacted) ? `rgba(${r},${g},${b},0.5)` : `rgba(${r},${g},${b},0.1)`,
              '&:hover': {
                bgcolor: (hasReacted) ? `rgba(${r},${g},${b},0.7)` : `rgba(${r},${g},${b},0.3)`
              }
            }}
            icon={<em-emoji id={rid} />}
            label={totalReacts}
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
