import React, { Fragment, useState, useEffect } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import moment from 'moment/moment';
import { firebaseDatabase } from '../../Firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import SendIcon from '@mui/icons-material/Send';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import PropTypes from 'prop-types';

function ModalScoreBoard ({ show, onClose, highscore }) {
  const [scores, setScores] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [hideProfile, setHideProfile] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    updateScoreboard();
  }, []);

  const handleHideProfile = () => {
    setHideProfile(!hideProfile);
  }
  
  const handleClose = (_, reason) => {
    if (reason && reason === 'backdropClick') return;
    onClose();
  }

  const recordScore = async () => {
    if (!userInfo?.uid) return;
  
    const usersCollectionRef = doc(firebaseDatabase, 'scores', userInfo?.uid);
    await setDoc(usersCollectionRef, { name: name || 'Anon', score: highscore, date: new Date(), photo: (hideProfile) ? null : userInfo?.photoURL });
    updateScoreboard();
  }

  const updateScoreboard = () => {
    const usersCollectionRef = collection(firebaseDatabase, 'scores');
    const getScores = async () => {
      const data = await getDocs(usersCollectionRef);
      setScores(
        data.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((scoreA, scoreB) => {
            if (scoreB.score - scoreA.score === 0) {
              return scoreA.date.seconds - scoreB.date.seconds;
            }
            return scoreB.score - scoreA.score;
          })
        );
    }
    getScores();
  }

  return (
    <Dialog
      hideBackdrop
      open={show}
      onClose={handleClose}
      aria-labelledby='draggable-dialog'
      fullWidth
    >
      <DialogTitle fontSize={30}>
        {'Public Scoreboard'}
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ border: '1px solid whitesmoke' }}>
          <Grid item xs={1} p={1} sx={{ borderBottom: '1px solid whitesmoke' }} />
          <Grid item xs={6} p={1} sx={{ borderBottom: '1px solid whitesmoke' }}>
            <Typography align='left'>
              {'Name'}
            </Typography>
          </Grid>
          <Grid item xs={1.5} p={1} sx={{ borderBottom: '1px solid whitesmoke', bgcolor: 'rgba(0,0,0,0.5)' }}>
            <Typography align='center'>
              {'Score'}
            </Typography>
          </Grid>
          <Grid item xs={3.5} p={1} sx={{ borderBottom: '1px solid whitesmoke' }}>
            <Typography align='right'>
              {'Date Achieved'}
            </Typography>
          </Grid>
          {(scores.length === 0) && (
            <Grid item xs={12} p={1}>
              <Typography align='center'>
                {'No scores recorded yet. Be the first one!'}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} sx={{ overflowY: 'overlay', maxHeight: '800px' }}>
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
              <Grid item xs={1} p={1} sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.5)' }}>
                <Typography>
                  {`#${index + 1}`}
                </Typography>
              </Grid>
              <Grid item xs={6} p={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  alt='Adornment'
                  src={score?.photo}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <Typography align='left' sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {score?.name}
                </Typography>
              </Grid>
              <Grid item xs={1.5} p={1} sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
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
        {(!userInfo?.uid) ? (
          <SignInButton setUserInfo={setUserInfo}/>
        ) : (
          <Fragment>
            <Grid container>
              <Grid item xs={10.5}>
                <TextField
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  fullWidth
                  label='Display Name'
                  helperText='Type in the name you want to be displayed next to your score on the scoreboard. Click on the icon if you do not wish for your icon to be displayed.'
                  InputProps={{
                    startAdornment: (
                      <Avatar
                        alt={userInfo?.email}
                        src={(hideProfile) ? null : userInfo?.photoURL} 
                        sx={{ width: 32, height: 32, mr: 1, cursor: 'pointer' }}
                        onClick={handleHideProfile}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='outlined' onClick={recordScore}>
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
            {(userInfo?.uid) && (
              <Typography color='text.secondary' fontSize={15} mt={5} align='center'>
                {`Currently signed in as ${userInfo?.email}.`}
              </Typography>
            )}
            <SignOutButton setUserInfo={setUserInfo}/>
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
  show: PropTypes.bool.isRequired
};

export default ModalScoreBoard;
