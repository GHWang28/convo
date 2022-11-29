import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import config from '../../config.json';

function StartModal ({ setGameState, highscore = 0}) {
  const handleClose = (_, reason) => {
    if (reason && reason === 'backdropClick') return;
    setGameState(1)
  }
  return (
    <Dialog
      open={true}
      onClose={handleClose}
    >
      <DialogTitle fontSize={30}>{'Spotter Rules'}</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2} fontSize={20} color='whitesmoke' align='center'>
          {'Spot the character before the time runs out!'}
        </DialogContentText>
        <DialogContentText ml={3} mb={1}>
          {`Each character you spot will give you ${config.SPOT_TIME} more seconds.`}
        </DialogContentText>
        <DialogContentText ml={3} mb={1}>
          {`Each wrong click will cost you ${config.ERROR_TIME * -1} seconds.`}
        </DialogContentText>
        <DialogContentText ml={3} mb={1}>
          {`Your timer can only cap at ${config.MAX_TIME} seconds.`}
        </DialogContentText>
        <DialogContentText ml={3} mb={1}>
          {`The more you progress, the more elements will be thrown into the board.`}
        </DialogContentText>
        <DialogContentText ml={3} mb={1}>
          {`Your final score will be the level you lost at.`}
        </DialogContentText>
        <DialogContentText ml={3} mb={1}>
          {`You can pause the game by clicking on the timer.`}
        </DialogContentText>
        <DialogContentText mt={2} fontSize={20} color='whitesmoke' align='center'>
          {`Current Highscore: ${highscore}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close Dialog</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StartModal;
