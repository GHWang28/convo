import './App.css';
import React, {useEffect, useState} from 'react';
import { Box } from '@mui/material';
import Game from './Game';
import StartModal from './components/StartModal';
import EndModal from './components/EndModal';
import { decrypt } from './helpers';

const ENUM = {
  title: 0,
  game: 1,
  end: 2
}

function App() {
  const [gameState, setGameState] = useState(ENUM.title);
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
      {(gameState === ENUM.title) && (
        <StartModal setGameState={setGameState} highscore={highScore} />
      )}
      {(gameState === ENUM.end) && (
        <EndModal setGameState={setGameState} highscore={highScore} score={score}/>
      )}
      {(gameState >= 0) && (
        <Game setGameState={setGameState} setHighScore={setHighScore} setScore={setScore}/>
      )}
    </Box>
  )
}

export default App;
