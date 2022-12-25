import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import getCharacterTypes from './getTypes';
import PropTypes from 'prop-types';

function CharacterCoin ({
  onClick,
  sx,
  size = 'min(70px, 15vw)',
  characterID = -1,
  correct = false
}) {
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const prunedSx = {...sx};
  delete prunedSx.opacity;

  return (
    <IconButton
      disableRipple
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      sx={{
        overflow: 'hidden',
        width: size,
        height: size,
        ...prunedSx,
        opacity: (clicked) ? '0.15' : sx?.opacity,
        transition: 'opacity 0.1s ease-out',
        pointerEvents: (clicked) ? 'none' : 'auto',
        bgcolor: 'rgba(101,200,255,0.5)',
        border: (hover) ? '3px solid whitesmoke' : ''
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
            : process.env.PUBLIC_URL + getCharacterTypes()[characterID]
        }
        alt={`character-${characterID}`}
      />
    </IconButton>
  )
}

CharacterCoin.propTypes = {
  onClick: PropTypes.func,
  sx: PropTypes.object,
  size: PropTypes.string,
  characterID: PropTypes.number,
  correct: PropTypes.bool
};

export default CharacterCoin;
