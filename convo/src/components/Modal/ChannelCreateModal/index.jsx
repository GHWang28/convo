import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { setFetching, setShowChannelCreateModal } from '../../../redux/actions';
import { FormControlLabel, Grid, TextField, Switch, Alert } from '@mui/material';
import { postNewChannel } from '../../../firebase/database';
import { toast } from 'react-toastify';

export default function ChannelCreateModal () {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [desc, setDesc] = useState('');
  const [publicMode, setPublicMode] = useState(false);

  const onConfirm = () => {
    if (!name) {
      toast.error('Channel name needs to be filled out.');
      setNameError(true);
      return;
    }
    dispatch(setFetching(true));
    postNewChannel(name, desc, publicMode, userData?.uid)
      .then(() => {
        onClose();
      })
      .finally(() => {
        dispatch(setFetching(false));
      })
  }

  const onClose = () => {
    dispatch(setShowChannelCreateModal(false));
    setName('');
    setDesc('');
    setPublicMode(false);
    setNameError(false);
  }
  
  return (
    <Modal
      open={useSelector(state => state.channelCreateModal)}
      title='Channel Create'
      handleConfirm={onConfirm}
      handleClose={onClose}
      confirmColor='success'
      fullWidth
    >
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={9}>
          <TextField
            sx={{ bgcolor: 'trayColorBg' }}
            label='Channel Name *'
            variant='outlined'
            fullWidth
            value={name}
            error={nameError && !name}
            onChange={(event) => { setName(event.target.value) }}
            onClick={() => { setNameError(false) }}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'end' }}>
          <FormControlLabel
            control={
              <Switch checked={publicMode} onChange={(event) => { setPublicMode(event.target.checked) }} />
            }
            label={(publicMode) ? 'Public' : 'Private'}
          />
        </Grid>
      </Grid>
      <TextField
        sx={{ mt: 2, bgcolor: 'trayColorBg' }}
        label='Channel Description'
        variant='outlined'
        fullWidth
        multiline
        rows={6}
        value={desc}
        onChange={(event) => { setDesc(event.target.value) }}
      />
      <Alert severity='warning' sx={{ mt: 2 }}>
        {'The channel\'s public status can not be changed later!'}
      </Alert>
    </Modal>
  )
}