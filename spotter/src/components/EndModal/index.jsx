import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { animated, useSpring } from "react-spring";
import getCharacterTypes from "../CharacterCoin/getTypes";
import ImageScroller from "../ImageScroller";
import PropTypes from 'prop-types';

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function EndModal ({ setGameState, highscore = 0, score = 0 }) {
  const handleClose = (_, reason) => {
    if (reason && reason === 'backdropClick') return;
    setGameState(-1);
  }
  const AnimatedDialog = animated(Dialog);

  return (
    <AnimatedDialog
      style={useSpring({
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
        delay: 2000
      })}
      hideBackdrop
      open={true}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby='draggable-dialog'
    >
      <DialogTitle
        fontSize={30}
        sx={{
          cursor: 'move'
        }}
      >
        {'Game Over'}
      </DialogTitle>
      <DialogContent>
        <ImageScroller images={getCharacterTypes()} />
        <DialogContentText mt={2} fontSize={25} color='whitesmoke' align='center' sx={{ bgcolor: 'rgba(0,0,0,0.3)' }}>
          {`Final score: ${score}`}
        </DialogContentText>
        <DialogContentText fontSize={25} color='whitesmoke' align='center'>
          {`Highscore: ${highscore}`}
        </DialogContentText>
        <DialogContentText mb={-2} mt={2}>
          {'(You can move this dialog box by dragging the top)'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Restart Game</Button>
      </DialogActions>
    </AnimatedDialog>
  )
}

EndModal.propTypes = {
  setGameState: PropTypes.func.isRequired,
  highscore: PropTypes.number,
  score: PropTypes.number
};

export default EndModal;
