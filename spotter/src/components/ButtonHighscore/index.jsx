import React from 'react';
import { Button, Tooltip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ButtonHighscore ({ onClick }) {
  return (
    <Tooltip placement='top' title='See Public Scoreboard' arrow >
      <Button startIcon={<EmojiEventsIcon />} variant='contained' onClick={onClick}>
        {'Public Scoreboard'}
      </Button>
    </Tooltip>
  )
}