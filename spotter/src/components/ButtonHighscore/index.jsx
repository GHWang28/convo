import React from 'react';
import { Button } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ButtonHighscore ({ onClick }) {
  return (
    <Button startIcon={<EmojiEventsIcon />} title='See Public Scoreboard' variant='contained' onClick={onClick}>
      {'Public Scoreboard'}
    </Button>
  )
}