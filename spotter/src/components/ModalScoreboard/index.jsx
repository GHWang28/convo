import React, { Fragment, useState, useEffect } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, LinearProgress, TextField, Tooltip, Typography } from '@mui/material';
import moment from 'moment/moment';
import { firebaseDatabase } from '../../Firebase';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from 'prop-types';

function ModalScoreBoard ({ show, onClose, highscore }) {
  const [scores, setScores] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [hideProfile, setHideProfile] = useState(false);
  const [name, setName] = useState('');
  const [fetching, setFetching] = useState(false);

  // Get scoreboard data by calling function
  useEffect(() => {
    updateScoreboard();
  }, []);

  // Hides profile when submitting score
  const handleHideProfile = () => {
    setHideProfile(!hideProfile);
  }

  // Closes the modal
  const handleClose = (_, reason) => {
    if (reason && reason === 'backdropClick') return;
    onClose();
  }

  // Adds score field to database
  const recordScore = async () => {
    if (!userInfo?.uid) return;
  
    const usersCollectionRef = doc(firebaseDatabase, 'scores', userInfo?.uid);
    await setDoc(usersCollectionRef, { name: name || 'Anon', score: highscore, date: new Date(), photo: (hideProfile) ? null : userInfo?.photoURL });
    updateScoreboard();
  }

  // Delete field in database
  const handleDelete = () => {
    const usersCollectionRef = doc(firebaseDatabase, 'scores', userInfo?.uid);
    deleteDoc(usersCollectionRef);
    updateScoreboard();
  }

  // Fetches scoreboard data from firebase
  const updateScoreboard = () => {
    const usersCollectionRef = collection(firebaseDatabase, 'scores');
    // Triggers fetching state
    setFetching(true);
    getDocs(usersCollectionRef)
      .then((data) => {
        setScores(
          data.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((scoreA, scoreB) => (((scoreB.score - scoreA.score === 0)) ? scoreA.date.seconds - scoreB.date.seconds : scoreB.score - scoreA.score ))
        );
      })
      .finally(() => {
        // Removes fetching state
        setFetching(false);
      })
  }

  return (
    <Dialog
      hideBackdrop
      open={show}
      onClose={handleClose}
      aria-labelledby='draggable-dialog'
      fullScreen
    >
      <DialogTitle fontSize={30}>
        {'Public Scoreboard'}
        <LinearProgress variant={(fetching) ? 'indeterminate' : 'determinate'} value={(fetching) ? 0 : 100}/>
      </DialogTitle>

      <DialogContent>
        <Grid container sx={{ border: '1px solid whitesmoke' }}>
          {/* Title */}
          <Grid item xs={2} p={1} sx={{ borderBottom: '1px solid whitesmoke', bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Tooltip placement='top' arrow title='Refetch for scores'>
              <IconButton onClick={updateScoreboard}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4} p={1} sx={{ borderBottom: '1px solid whitesmoke' }}>
            <Typography align='left'>
              {'Name'}
            </Typography>
          </Grid>
          <Grid item xs={2.5} p={1} sx={{ borderBottom: '1px solid whitesmoke', bgcolor: 'rgba(0,0,0,0.5)' }}>
            <Typography align='center'>
              {'Score'}
            </Typography>
          </Grid>
          <Grid item xs={3.5} p={1} sx={{ borderBottom: '1px solid whitesmoke' }}>
            <Typography align='right'>
              {'Date Achieved'}
            </Typography>
          </Grid>

          {/* Scores */}
          <Grid item xs={12} sx={{ overflowY: 'overlay', height: '51vh' }}>
            {(scores.length === 0) && (
              <Grid item xs={12} p={1}>
                <Typography align='center'>
                  {'No scores recorded yet. Be the first one!'}
                </Typography>
              </Grid>
            )}
            {scores.map((score, index) => (
              <Grid
                container
                key={score.id}
                sx={(score.id === userInfo?.uid) ? {
                  position: 'sticky',
                  top: '0px',
                  bottom: '0px',
                  bgcolor: 'rgb(100,90,0)',
                  border: '2px solid yellow',
                  zIndex: 2
                } : {}}
              >
                <Grid item xs={2} p={1} sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.5)' }}>
                  <Typography>
                    {`#${index + 1}`}
                  </Typography>
                </Grid>
                <Grid item xs={4} p={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    alt='Adornment'
                    src={score?.photo}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography align='left' sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {score?.name}
                  </Typography>
                </Grid>
                <Grid item xs={2.5} p={1} sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                  <Typography align='center'>
                    {score?.score}
                  </Typography>
                </Grid>
                <Grid item xs={3.5} p={1} pr={2}>
                  <Typography align='right'>
                    {moment.unix(Number(score?.date?.seconds)).format("Do MMM YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Box component='hr' mt={3} mb={0}/>
        <Box p={2}>
          <Typography align='center'>
            {'Your Current Highscore: '}
            <b>{highscore}</b>
          </Typography>
        </Box>

        {/* Sign in */}

        {(!userInfo?.uid) ? (
          /* Ask to sign in */
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <SignInButton setUserInfo={setUserInfo}/>
          </Box>
        ) : (
          /* Form to record score to public board */
          <Fragment>
            <Box sx={{ display: 'flex' }}>
              <TextField
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                fullWidth
                label='Display Name'
                helperText='Type in the name you want to be displayed next to your score on the scoreboard. Click on the icon if you do not wish for your icon to be displayed.'
                InputProps={{ startAdornment: (
                  <Avatar
                    alt={userInfo?.email}
                    src={(hideProfile) ? null : userInfo?.photoURL} 
                    sx={{ width: 32, height: 32, mr: 1, cursor: 'pointer' }}
                    onClick={handleHideProfile}
                  />
                )}}
              />
              <Tooltip placement='top' title={`Record your ${highscore} score to the Public Scoreboard`} arrow>
                <Button variant='outlined' onClick={recordScore}>
                  <SendIcon />
                </Button>
              </Tooltip>
            </Box>
            {(userInfo?.uid) && (
              <Typography color='text.secondary' fontSize={15} mt={5} align='center'>
                {`Currently signed in as ${userInfo?.email}.`}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              {/* Delete Score Button */}
              <Tooltip title='Delete your recorded score from the board' placement='top' arrow>
                <Button
                  color='warning'
                  startIcon={<DeleteForeverIcon />}
                  variant='contained'
                  sx={{ mt: 1 }}
                  onClick={handleDelete}
                >
                  {'Delete Score from board'}
                </Button>
              </Tooltip>
              {/* Sign out button */}
              <SignOutButton setUserInfo={setUserInfo}/>
            </Box>
          </Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

ModalScoreBoard.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  highscore: PropTypes.number.isRequired,
};

export default ModalScoreBoard;
