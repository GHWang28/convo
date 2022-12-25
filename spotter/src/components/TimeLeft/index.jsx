import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import useSound from 'use-sound';
import TickSFX from '../../sfx/tick.ogg';
import PropTypes from 'prop-types';

function TimeLeft ({ currTimeLeft, maxTime, onPause }) {
  const [playTick] = useSound(TickSFX);
  useEffect(() => {
    if (currTimeLeft <= 5) playTick();
  }, [ currTimeLeft, playTick ])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        boxShadow: '0px 0px 50px 10px rgba(0,0,0,0.5)',
        px: 2,
        width: '120px',
        cursor: 'pointer',
        zIndex: 12
      }}
      onClick={onPause}
    >
      <Typography sx={{ userSelect: 'none' }} fontSize={20}>
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
        <CircularProgress
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            translate: '-50% -50%',
            opacity: 0.25
          }}
          size={'120px'}
          variant='determinate'
          color={(currTimeLeft <= 15) ? 'error' : 'primary'}
          value={100}
        />
        <Typography
          fontSize={60}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            translate: '-50% -50%',
            color: (currTimeLeft <= 15) ? 'lightcoral' : '',
            userSelect: 'none'
          }}
        >
          {currTimeLeft}
        </Typography>
      </Box>
    </Box>
  )
}

TimeLeft.propTypes = {
  currTimeLeft: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default TimeLeft;
