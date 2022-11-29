import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

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
  return (
    <Dialog
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
        <DialogContentText mt={2} fontSize={20} color='whitesmoke' align='center'>
          {`Final score: ${score}`}
        </DialogContentText>
        <DialogContentText mt={2} fontSize={20} color='whitesmoke' align='center'>
          {`Highscore: ${highscore}`}
        </DialogContentText>
        <DialogContentText mb={-2} mt={8}>
          {'(You can move this dialog box)'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Restart Game</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EndModal;
