import { Alert, Button, Tooltip } from '@mui/material';
import { signOut } from 'firebase/auth';
import { Fragment, useState } from 'react';
import { auth } from '../../Firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';

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
    <Fragment>
      <Tooltip placement='top' title='Sign out' arrow >
        <Button startIcon={<LogoutIcon />} color='error' variant='contained' sx={{ mt: 2, width: '33.333%' }} onClick={onSignOut}>
          {'Sign Out'}
        </Button>
      </Tooltip>
      {(error?.code) && (
        <Alert severity='error' variant='outlined' sx={{ mt: 1 }}>
          {`Error ${error?.code}`}
          <hr/>
          {`${error?.message}`}
        </Alert>
      )}
    </Fragment>
  )
}

SignOutButton.propTypes = {
  setUserInfo: PropTypes.func.isRequired,
};
