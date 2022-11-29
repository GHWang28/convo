import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment } from 'react';
import { useTimer } from 'react-timer-hook'
import Character from '../components/Character';

function Game ({ setGameState }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: time, autoStart: false, onExpire: () => console.warn('onExpire called') });
  const currTimeLeft = seconds + minutes * 60;

  return (
    <Fragment>
      <Box id={'playing-field'} sx={{ width: '100%', height: '80%', position: 'relative'}}>

      </Box>
      <Box id={'bottom-bar'} sx={{ width: '100%', height: '20%', bgcolor: 'whitesmoke', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Typography fontSize={30}>
          {'Spot:'}
        </Typography>
        <Character />
        <Typography fontSize={30}>
          {`Seconds Left: ${currTimeLeft}`}
        </Typography>
      </Box>
    </Fragment>
  )

  function onFind () {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + Math.min(currTimeLeft + 5, 60));
    restart(newTime);
  }
}

export default Game;
