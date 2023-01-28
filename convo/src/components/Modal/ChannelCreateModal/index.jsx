import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { setFetching, setShowChannelCreateModal } from '../../../redux/actions';
import { FormControlLabel, Grid, TextField, Alert, useMediaQuery, useTheme, Typography, Box } from '@mui/material';
import { postNewChannel } from '../../../firebase/database';
import { toast } from 'react-toastify';
import { SwitchChannelCreate } from '../../SwitchChannelCreate';
import ImageUploader from '../../ImageUploader';

export default function ChannelCreateModal () {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loggedInUserData);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const [publicMode, setPublicMode] = useState(false);
  const theme = useTheme();
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm')); 
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md')); 

  const onConfirm = () => {
    if (!name.trim() || name.trim().charAt(0) === '#') {
      toast.error((!name) ? 'Channel name needs to be filled out.' : 'Channel name can not start with \'#\'.');
      setNameError(true);
      return;
    }

    dispatch(setFetching(true));
    postNewChannel(
      userData?.uid,
      {
        name: name.trim(),
        description,
        theme: (publicMode) ? theme.palette.publicColor : theme.palette.privateColor,
        publicMode,
        channelPic: image.at(0)?.dataURL || ''
      }
    ).then(() => {
      onClose();
    })
    .finally(() => {
      dispatch(setFetching(false));
    })
  }

  const onClose = () => {
    dispatch(setShowChannelCreateModal(false));
  }
  const onExited = () => {
    setName('');
    setDescription('');
    setImage([]);
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
      onExited={onExited}
      confirmColor='success'
      fullWidth
      fullScreen={!smallMq}
    >
      <ImageUploader imageArray={image} setImageArray={setImage} alt={name || 'New Channel'} placeholderSrc={'default-channel-white.svg'}/>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={12} md={8}>
          <TextField
            sx={{ bgcolor: 'mainColorNormal', width: '100%' }}
            label='Channel Name *'
            variant='outlined'
            value={name}
            error={nameError && (!name || name.charAt(0) === '#')}
            onChange={(event) => { setName(event.target.value) }}
            onClick={() => { setNameError(false) }}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControlLabel
            control={ <SwitchChannelCreate checked={publicMode} onChange={(event) => { setPublicMode(event.target.checked) }}/> }
            label={(publicMode) ? (
              <Typography>
                <Box component='span' sx={{ fontWeight: 'bold', opacity: '0.5' }}>
                  {'Private/'}
                </Box>
                <Box component='span' sx={{ fontWeight: 'bold', opacity: '1', color: 'publicColor' }}>
                  {'Public'}
                </Box>
              </Typography>
            ) : (
              <Typography>
                <Box component='span' sx={{ fontWeight: 'bold', opacity: '1', color: 'privateColor' }}>
                  {'Private'}
                </Box>
                <Box component='span' sx={{ fontWeight: 'bold', opacity: '0.5' }}>
                  {'/Public'}
                </Box>
              </Typography>
            )}
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
        value={description}
        onChange={(event) => { setDescription(event.target.value) }}
      />
      <Alert severity='warning' sx={{ mt: 2 }}>
        {'The channel\'s public status can not be changed later!'}
      </Alert>
    </Modal>
  )
}