import React, { Fragment, useState } from 'react';
import { Alert, Button, Tooltip, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, githubProvider, googleProvider } from '../../Firebase';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import PropTypes from 'prop-types';

export default function SignInButton ({ setUserInfo }) {
  const [error, setError] = useState({});

  const signIn = async (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setUserInfo(result.user);
        setError({});
      })
      .catch((error) => {
        setError({
          code: error.code,
          message: error.message
        });
      })
  }

  return (
    <Fragment>
      <Typography align='center' fontSize={13}>{'Become the envy of your friends and dominate the leaderboards by signing in and showcasing your impressive highscore to the world!'}</Typography>
      <Typography align='center' fontSize={13}>{'Sign in with...'}</Typography>
      <Tooltip placement='top' title='Sign in with Google' arrow >
        <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mt: 2, width: '33.333%' }} onClick={() => { signIn(googleProvider) }}>
          {'Google'}
        </Button>
      </Tooltip>
      <Tooltip placement='top' title='Sign in with GitHub' arrow >
        <Button startIcon={<GitHubIcon />} variant='contained' sx={{ mt: 2, width: '33.333%' }} onClick={() => { signIn(githubProvider) }}>
          {'GitHub'}
        </Button>
      </Tooltip>
      {(error?.code) && (
        <Alert severity='error' variant='outlined' sx={{ mt: 2 }}>
          {`Error ${error?.code}`}
          <hr/>
          {(error?.code === 'auth/account-exists-with-different-credential')
            ? `An account with this email is already registered on the scoreboard with a different provider. Please sign in with the previous provider.`
            : `${error?.message}`}
        </Alert>
      )}
    </Fragment>
  )
}

SignInButton.propTypes = {
  setUserInfo: PropTypes.func.isRequired,
};
