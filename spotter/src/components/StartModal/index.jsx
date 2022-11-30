import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import config from '../../config.json';
import { animated, useSpring } from "react-spring";
import getCharacterTypes from "../CharacterCoin/getTypes";
import ImageScroller from "../ImageScroller";

function StartModal ({ setGameState, highscore = 0}) {
  const handleClose = (_, reason) => {
    if (reason && reason === 'backdropClick') return;
    setGameState(1);
  }

  const AnimatedDialog = animated(Dialog);

  return (
    <AnimatedDialog
      style={useSpring({
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
        delay: 500
      })}
      hideBackdrop
      open={true}
      onClose={handleClose}
    >
      <DialogTitle fontSize={30}>{'Spotter'}</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2} fontSize={20} color='whitesmoke' align='center'>
          {'Spot the character before the time runs out!'}
        </DialogContentText>
        <ImageScroller images={getCharacterTypes()} />
        <DialogContentText mb={1} fontSize={18} mt={3} sx={{ bgcolor: 'rgba(0,0,0,0.3)' }}>
          {'Each character you spot will give you '}
          <strong>{`${config.SPOT_TIME} more seconds.`}</strong>
        </DialogContentText>
        <DialogContentText mb={1} fontSize={18}>
          {'Each wrong click will cost you '}
          <strong>{`${config.ERROR_TIME * -1} seconds.`}</strong>
        </DialogContentText>
        <DialogContentText mb={1} fontSize={18} sx={{ bgcolor: 'rgba(0,0,0,0.3)' }}>
          {'Your timer can only cap at '}
          <strong>{`${config.MAX_TIME} seconds.`}</strong>
        </DialogContentText>
        <DialogContentText mb={1} fontSize={18}>
          {`The more you progress, the more elements will be thrown into the board.`}
        </DialogContentText>
        <DialogContentText mb={1} fontSize={18} sx={{ bgcolor: 'rgba(0,0,0,0.3)' }}>
          {`Your final score will be the level you lost at.`}
        </DialogContentText>
        <DialogContentText mb={1} fontSize={18}>
          {'You '}
          <strong>{'can not'}</strong>
          {' pause the game once started.'}
        </DialogContentText>
        <DialogContentText fontWeight={'bold'} mt={2} fontSize={25} color='whitesmoke' align='center'>
          {`Current Highscore: ${highscore}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close Dialog</Button>
      </DialogActions>
    </AnimatedDialog>
  )
}

export default StartModal;
