import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import types from './types.json';

function CharacterCoin ({
  onClick,
  sx,
  size = '90px',
  characterID = -1,
  correct = false
}) {
  const [clicked, setClicked] = useState(false);
  const prunedSx = {...sx};
  delete prunedSx.opacity;

  return (
    <IconButton
      disableRipple
      sx={{
        overflow: 'hidden',
        width: size,
        height: size,
        ...prunedSx,
        opacity: (clicked) ? '0.15' : sx?.opacity,
        transition: 'opacity 0.1s ease-out',
        pointerEvents: (clicked) ? 'none' : 'auto',
        bgcolor: 'rgba(101,200,255,0.5)'
      }}
      onClick={() => {
        if (!correct) setClicked(true);
        onClick(characterID)
      }}
    >
      <Box
        component='img'
        width='121%'
        height='121%'
        src={
          (characterID < 0)
            ? process.env.PUBLIC_URL + '/images/unidentified.png'
            : process.env.PUBLIC_URL + types.characters[characterID]
        }
        alt={`character-${characterID}`}
      />
    </IconButton>
  )
}

export default CharacterCoin;
