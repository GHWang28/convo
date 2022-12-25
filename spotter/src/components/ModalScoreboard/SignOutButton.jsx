import { Alert, Box, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../Firebase';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOutButton ({ setUserInfo }) {
  const [error, setError] = useState({});

  const onSignOut = async () => {
    signOut(auth)
      .then(() => {
        setUserInfo({});
      })
      .catch((error) => {
        setError({
          code: error.code,
          message: error.message
        });
      })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Button startIcon={<LogoutIcon />} color='error' variant='contained' sx={{ mt: 2, width: '33.333%' }} onClick={onSignOut}>
        {'Sign Out'}
      </Button>
      {(error?.code) && (
        <Alert severity='error' variant='outlined' sx={{ mt: 2 }}>
          {`Error ${error?.code}`}
          <hr/>
          {`${error?.message}`}
        </Alert>
      )}
    </Box>
  )
}