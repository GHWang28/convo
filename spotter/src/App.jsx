import './App.css';
import React, {useState} from 'react';
import { Box } from '@mui/material';
import Game from './gameStates/Game';

const ENUM = {
  title: 0,
  game: 1,
  end: 2
}

function App() {
  const [gameState, setGameState] = useState(ENUM.game);

  return (
    /* Stage */ 
    <Box sx={{ width: '100vw', height: '100vh' }}>
      {(gameState === ENUM.game) && (
        <Game setGameState={setGameState} />
      )}
    </Box>
  )
}

export default App;
