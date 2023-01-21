import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { setFetching, setShowChannelCreateModal } from '../../../redux/actions';
import { FormControlLabel, Grid, TextField, Switch, Alert, useMediaQuery, useTheme } from '@mui/material';
import { postNewChannel } from '../../../firebase/database';
import { toast } from 'react-toastify';

export default function ChannelCreateModal () {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [desc, setDesc] = useState('');
  const [publicMode, setPublicMode] = useState(false);
  const theme = useTheme();
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm')); 
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md')); 

  const onConfirm = () => {
    if (!name) {
      toast.error('Channel name needs to be filled out.');
      setNameError(true);
      return;
    }

    const themeScheme = (publicMode) ? theme.palette.publicColor : theme.palette.privateColor;

    dispatch(setFetching(true));
    postNewChannel(name, desc, themeScheme, publicMode, userData?.uid)
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
      subtitle='The beginning of a new conversation'
      handleConfirm={onConfirm}
      handleClose={onClose}
      confirmColor='success'
      fullWidth
      fullScreen={!smallMq}
    >
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={12} md={9}>
          <TextField
            sx={{ bgcolor: 'mainColorNormal', width: '100%' }}
            label='Channel Name *'
            variant='outlined'
            value={name}
            error={nameError && !name}
            onChange={(event) => { setName(event.target.value) }}
            onClick={() => { setNameError(false) }}
          />
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: (mediumMq) ? 'end' : 'center' }}>
          <FormControlLabel
            control={ <Switch checked={publicMode} onChange={(event) => { setPublicMode(event.target.checked) }}/> }
            label={(publicMode) ? 'Public' : 'Private'}
          />
        </Grid>
      </Grid>
      <TextField
        sx={[(mediumMq) && { mt: 2 }, { bgcolor: 'mainColorNormal' }]}
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