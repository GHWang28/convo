import React from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import useSound from 'use-sound';
import TickSFX from '../../sfx/tick.ogg';

function TimeLeft ({ currTimeLeft, maxTime }) {
  const [playTick] = useSound(TickSFX);
  if (currTimeLeft <= 5) playTick();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        boxShadow: '0px 0px 50px 10px rgba(0,0,0,0.5)',
        px: 2,
        width: '120px'
      }}
    >
      <Typography fontSize={20}>
        {'Time:'}
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <CircularProgress
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            translate: '-50% -50%'
          }}
          size={'120px'}
          variant='determinate'
          color={(currTimeLeft <= 15) ? 'error' : 'primary'}
          value={(currTimeLeft / maxTime) * 100}
        />
        <Typography
          fontSize={60}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            translate: '-50% -50%',
            color: (currTimeLeft <= 15) ? 'lightcoral' : ''
          }}
        >
          {currTimeLeft}
        </Typography>
      </Box>
    </Box>
  )
}

export default TimeLeft;