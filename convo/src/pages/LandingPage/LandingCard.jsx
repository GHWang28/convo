import React, { useState } from 'react';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { browserLocalPersistence, browserSessionPersistence, signInWithPopup } from 'firebase/auth';
import { auth, githubProvider, googleProvider } from '../../firebase';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function LandingCard () {
  const [fetching, setFetching] = useState(false);
  const [persist, setPersist] = useState(false);

  const signIn = async (provider) => {
    // Set fetching status
    setFetching(true);

    await auth.signOut();

    auth.setPersistence((persist) ? browserLocalPersistence : browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
      .then(() => {
        toast.success('Logged in');
      })
      .catch((error) => {
        toast.error(error?.message)
      })
      .finally(() => {
        setFetching(false);
      })
  }

  const rememberMe = (newValue) => {
    setPersist(newValue);
  }

  return (
    <Box
      sx={{
        bgcolor: 'whitesmoke',
        border: '2px solid whitesmoke',
        borderRadius: '20px',
        height: '100%',
        width: '100%',
        position: 'relative',
        color: 'black',
        boxSizing: 'border-box',
        maxWidth: '800px'
      }}
      p={5}
    >
      {(fetching) && (
        <CircularProgress
          color='inherit'
          sx={{ position: 'absolute', bottom: '20px', left: '20px' }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant='h3' align='center' color='black'>{'Welcome!'}</Typography>
        <Box sx={{ width: '100%' }} component='hr' />
        <Button
          startIcon={<GoogleIcon />}
          variant='contained'
          sx={{ mt: 'auto', mb: 1, width: '80%' }}
          onClick={() => { signIn(googleProvider) }}
        >
          {'Continue with Google'}
        </Button>
        <Button
          startIcon={<GitHubIcon />}
          variant='contained'
          sx={{ mt: 1, width: '80%' }}
          onClick={() => { signIn(githubProvider) }}
        >
          {'Continue with GitHub'}
        </Button>
        <FormGroup sx={{ mb: 'auto', mt: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                checked={persist}
                onChange={(event) => {
                  rememberMe(event.target.checked);
                }}
              />
            }
            label={<Typography color='black'>Remember me</Typography>}
          />
        </FormGroup>
      </Box>
    </Box>
  )
}