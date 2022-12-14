import React, { Fragment, useEffect, useState } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/material';
import { useTimer } from 'react-timer-hook'
import TimeLeft from '../components/TimeLeft';
import CharacterProfile from '../components/CharacterProfile';
import { generateLevel } from './generateLevel';
import CharacterCoin from '../components/CharacterCoin';
import correctSFX from '../sfx/correct.ogg';
import errorSFX from '../sfx/error.ogg';
import useSound from 'use-sound';
import LevelDisplay from '../components/LevelDisplay';
import config from '../config.json';
import Spotlight from '../components/Spotlight';
import Distraction from '../components/Distraction';
import { decrypt, encrypt } from '../helpers';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';

function Game ({ setGameState, setHighScore, setScore}) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + config.START_TIME);

  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [levelData, setLevelData] = useState(null);
  const [lastClicked, setLastClicked] = useState(-1);
  const [playCorrect] = useSound(correctSFX);
  const [playError] = useSound(errorSFX);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Build level
    setLevelData(generateLevel(0));
  }, [])

  const {
    seconds,
    minutes,
    isRunning,
    // start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => {
      const currScore = Number(decrypt(localStorage.getItem('highscore')));
      const highScore = Math.max(levelData?.level, currScore);

      setGameOver(true);
      setGameState(2);
      setHighScore(highScore);
      setScore(levelData?.level);
      localStorage.setItem('highscore', encrypt(String(highScore)));
    }
  });
  const currTimeLeft = seconds + minutes * 60;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      {/* The box that wraps around the place where the characters spawn */}
      <Box
        id={'playing-field'}
        sx={{
          width: '100%',
          flexGrow: 1,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Pause screen */}
        {(!isRunning && levelData?.level !== 0 && !gameOver) && (
          <Box
            name='pause'
            sx={{
              position: 'fixed',
              width: '100vw',
              height: 'calc(100vh - 200px)',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'whitesmoke'
            }}
          >
            <Typography fontSize={30} fontWeight='bold'>
              Click on Timer to Unpause
            </Typography>
          </Box>
        )}
        {/* Display game */}
        {(!(!isRunning && levelData?.level !== 0 && !gameOver)) && (
          <Fragment>
            {/* External modifiers */}
            {(!gameOver && !isMobile) && <Spotlight radius={levelData?.spotlightRadius}/>}
            {(levelData?.distraction && !gameOver) && <Distraction />}
            <LevelDisplay level={levelData?.level} />
            {/* The correct character to click on */}
            <CharacterCoin
              correct
              key={levelData?.characterToSpotData?.id}
              characterID={levelData?.characterToSpotData?.cid}
              sx={{
                top: levelData?.characterToSpotData?.top,
                left: levelData?.characterToSpotData?.left,
                position: 'absolute',
                translate: '-50% -50%',
                zIndex: levelData?.characterToSpotData?.zIndex,
                ...levelData?.characterToSpotData?.modifiers
              }}
              onClick={(!gameOver) ? onFind : null}
            />
            {/* The wrong characters to click on */}
            {levelData?.otherCharacterData.map((charData, index) => (
              <CharacterCoin
                key={`${index}-${charData?.id}`}
                characterID={charData?.cid}
                sx={{
                  top: charData?.top,
                  left: charData?.left,
                  position: 'absolute',
                  translate: '-50% -50%',
                  zIndex: charData?.zIndex,
                  opacity: (gameOver) ? '0.15' : '1.0',
                  ...charData?.modifiers
                }}
                onClick={(!gameOver) ? onError : null}
              />
            ))}
          </Fragment>
        )}
      </Box>

      {/* Bottom Bar to display who to click on*/}
      <Box
        id={'bottom-bar'}
        sx={{
          width: '100%',
          height: '200px',
          bgcolor: 'rgb(60,64,67)',
          color: 'whitesmoke',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: (smallMq) ? '50px' : '0.5px',
          overflow: 'hidden'
        }}
      >
        {/* Who to spot */}
        <CharacterProfile characterID={levelData?.characterToSpotData?.cid}/>
        {/* Time Left */}
        <TimeLeft
          onPause={() => {
            if (levelData?.level === 0) return;
            if (isRunning) {
              pause();
            } else {
              resume();
            }
          }}
          currTimeLeft={currTimeLeft}
          maxTime={config.MAX_TIME}
        />
        {/* Last Spotted Character */}
        <CharacterProfile characterID={lastClicked} title='Last Error:'/>
      </Box>
    </Box>
  )

  /**
   * This function is called when the correct character
   * is spotted
   * @param {Number} characterID 
   */
  function onFind (characterID) {
    // Add time to timer
    const newTime = new Date();
    newTime.setSeconds(
      newTime.getSeconds()
      + Math.min(currTimeLeft + config.SPOT_TIME, config.MAX_TIME)
    );
    restart(newTime);
    
    // Load in next level
    setLevelData(generateLevel(levelData.level + 1));
    setLastClicked(-1);
    playCorrect();
  }

  /**
   * This function is called when the wrong character
   * is spotted
   * @param {Number} characterID 
   */
  function onError (characterID) {
    // Subtract time from timer
    const newTime = new Date();
    newTime.setSeconds(
      newTime.getSeconds()
      + Math.min(currTimeLeft + config.ERROR_TIME, config.MAX_TIME)
    );
    restart(newTime);
    setLastClicked(characterID);
    playError();
  }
}

Game.propTypes = {
  setGameState: PropTypes.func.isRequired, 
  setHighScore: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired
};

export default Game;
