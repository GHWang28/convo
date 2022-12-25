import './App.css';
import React, {useEffect, useState} from 'react';
import { Box } from '@mui/material';
import ModalStart from './components/ModalStart';
import ModalEnd from './components/ModalEnd';
import { decrypt } from './helpers';
import Game from './components/Game';
import ModalScoreBoard from './components/ModalScoreboard';

const ENUM = {
  title: 0,
  game: 1,
  end: 2
}

function App() {
  const [gameState, setGameState] = useState(ENUM.title);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [highScore, setHighScore] = useState(
    decrypt(localStorage.getItem('highscore')) || 0
  );
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameState >= 0) return;
    setGameState(ENUM.game);
  }, [gameState]);

  return (
    /* Stage */ 
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <ModalScoreBoard show={showScoreboard} onClose={() => { setShowScoreboard(false) }} highscore={Number(highScore)}/>
      <ModalStart show={gameState === ENUM.title && !showScoreboard} setGameState={setGameState} highscore={Number(highScore)} setShowScoreboard={setShowScoreboard} />
      <ModalEnd show={gameState === ENUM.end && !showScoreboard} setGameState={setGameState} highscore={Number(highScore)} score={score} setShowScoreboard={setShowScoreboard} />
      {(gameState >= 0) && (
        <Game setGameState={setGameState} setHighScore={setHighScore} setScore={setScore}/>
      )}
    </Box>
  )
}

export default App;
