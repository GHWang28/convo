import React, { useState, useEffect } from 'react';
import { Box, Chip } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { getUser, postDelMessageReact } from '../../firebase/database';
import { animated, useTransition } from 'react-spring';
import { getTextColor, parseRGB } from '../../helpers';
import config from '../../config.json';
import PropTypes from 'prop-types';

export default function EmojiTrain ({ messageData, viewerUID, color, interactable = false }) {
  if (!(messageData?.reactions && Object.keys(messageData?.reactions).length !== 0)) return null;
  
  return (
    <Box
      p={0.4}
      sx={{
        bgcolor: 'mainColorDark',
        width: 'fit-content',
        borderRadius: '20px',
        display: 'grid',
        maxWidth: '100%',
        gridTemplateColumns: 'repeat(auto-fit, minmax(60px, max-content))',
        justifyContent: 'left',
        alignItems: 'flex-start',
        gap: 0.4
      }}
    >
      {messageData?.reactionsOrder.map((rid) => {
        if (!messageData?.reactions?.[rid]) return null;
        return (
          <EmojiChip
            key={rid}
            rid={rid}
            reactionData={messageData?.reactions?.[rid]}
            cid={messageData?.cid}
            mid={messageData?.mid}
            viewerUID={viewerUID}
            color={color}
            interactable={interactable}
          />
        )
      })}
    </Box>
  )
}

EmojiTrain.propTypes = {
  messageData: PropTypes.object.isRequired,
  viewerUID: PropTypes.string.isRequired,
  color: PropTypes.string,
  interactable: PropTypes.bool
}

function EmojiChip ({ reactionData, rid, cid, mid, viewerUID, color, interactable }) {
  const [r, g, b] = parseRGB(color);
  const [reactors, setReactors] = useState('');

  // Get reactor's handles
  useEffect(() => {
    const allUIDs = Object.keys(reactionData);

    // Don't do anything if the length exceeds 10 users
    if (allUIDs.length > config.MAX_REACTORS) {
      setReactors(`${config.MAX_REACTORS}+ reactors`);
      return;
    }
    Promise.all(allUIDs.map((uid) => (
      getUser(uid).then((userData) => (userData?.handle))
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

  const onClick = () => {
    if (!interactable) return;
    postDelMessageReact(
      cid,
      mid,
      viewerUID,
      rid,
      Boolean(!reactionData?.[viewerUID])
    );
  }

  return transition((style, totalReacts) => (
    (totalReacts === 0) ? (
      null
    ) : (
      <BootstrapTooltip title={reactors} placement='top'>
        <AnimatedChip
          style={style}
          sx={{
            pl: 1,
            WebkitTapHighlightColor: 'transparent',
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
          icon={<em-emoji shortcodes={rid} />}
          label={totalReacts}
          onClick={onClick}
        />
      </BootstrapTooltip>
    )
  ))
}

EmojiChip.propTypes = {
  reactionData: PropTypes.object.isRequired,
  rid: PropTypes.string.isRequired,
  cid: PropTypes.string.isRequired,
  mid: PropTypes.string.isRequired,
  viewerUID: PropTypes.string.isRequired,
  color: PropTypes.string,
  interactable: PropTypes.bool
}
