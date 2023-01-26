import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { setFetching, setShowChannelEditModal } from '../../../redux/actions';
import { Box, Divider, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { RgbStringColorPicker } from 'react-colorful';
import TextInputRGB from '../../TextInputRGB';
import config from '../../../config.json';
import { getChannelIcon } from '../../../helpers';
import { editChannel } from '../../../firebase/database';

export default function ChannelEditModal () {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userData = useSelector(state => state.loggedInUserData);
  const channelData = useSelector(state => state.channelEditModal);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState(0);
  const [nameError, setNameError] = useState(false);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!channelData) return;
    setName(channelData.name);
    setDescription(channelData.description);
    setColor(channelData.theme);
    setIcon(channelData.iconIndex);
  }, [channelData]);

  const onConfirm = () => {
    if (!name || name.charAt(0) === '#') {
      toast.error((!name) ? 'Channel name needs to be filled out.' : 'Channel name can not start with \'#\'.');
      setNameError(true);
      return;
    }
    dispatch(setFetching(true));
    editChannel({
        ...channelData,
        name,
        description,
        theme: color,
        iconIndex: icon
      },
      channelData?.cid,
      userData?.uid
    ).then(() => {
      onClose();
    }).finally(() => {
      dispatch(setFetching(false));
    })
  }

  const onClose = () => {
    setNameError(false);
    dispatch(setShowChannelEditModal(null));
  }
  
  return (
    <Modal
      open={Boolean(channelData)}
      title='Channel Edit'
      subtitle='Pouring over a fresh coat of paint'
      handleConfirm={onConfirm}
      handleClose={onClose}
      confirmColor='success'
      fullWidth
      fullScreen={!smallMq}
    >
      <TextField
        InputProps={{ sx: { bgcolor: 'mainColorNormal' } }}
        label='Channel Name *'
        variant='outlined'
        fullWidth
        value={name}
        error={nameError && (!name || name.charAt(0))}
        onChange={(event) => { setName(event.target.value) }}
        onClick={() => { setNameError(false) }}
      />
      <TextField
        sx={{ mt: 2 }}
        InputProps={{ sx: { bgcolor: 'mainColorNormal' } }}
        label='Channel Description'
        variant='outlined'
        fullWidth
        multiline
        rows={2}
        value={description}
        onChange={(event) => { setDescription(event.target.value) }}
      />
      
      <Grid container mt={1}>
        {/* Color Picker */}
        <Grid item xs={12} sm={6} pr={1}>
          <Typography fontWeight='bold' ml={1} my={1}>
            {'Channel Theme'}
          </Typography>
          <TextInputRGB color={color} setColor={setColor} />
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <RgbStringColorPicker color={color} onChange={setColor} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography align='center' mb={0.5}>
                {'Preview'}
              </Typography>
              <Box
                bgcolor={color}
                height='50px'
                width='50px'
                borderRadius='50%'
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, alignItems: 'center' }}>
            <Box
              role='button'
              onClick={() => { setColor(theme.palette.publicColor) }}
              sx={{ cursor: 'pointer', '&:hover': { scale: '1.1' }, transition: 'scale 0.25s ease-in-out', borderRadius: '25%', bgcolor: theme.palette.publicColor, width: '50px', height: '50px' }}
            />
            <Typography mx={2}>
              {'🡄 Presets 🡆'}
            </Typography>
            <Box
              role='button'
              onClick={() => { setColor(theme.palette.privateColor) }}
              sx={{ cursor: 'pointer', '&:hover': { scale: '1.1' }, transition: 'scale 0.25s ease-in-out', borderRadius: '25%', bgcolor: theme.palette.privateColor, width: '50px', height: '50px' }}
            />
          </Box>
        </Grid>
        {(smallMq) ? (
          <Divider orientation={'vertical'} flexItem sx={{ mr: '-2px', borderColor: 'whitesmoke' }} />
        ) : (
          <Box component='hr' sx={{ width: '100%', my: 2 }} />
        )}
        {/* Channel Icon */}
        <Grid item xs={12} sm={6} pl={1}>
          <Typography fontWeight='bold' ml={1} my={1}>
            {'Channel Icon'}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[...Array(config.TOTAL_CHANNEL_ICONS)].map((_, index) => (
              <Box
                key={`channel-icon-${index}`}
                role='button'
                onClick={() => { setIcon(index) }}
                sx={{
                  border: `1px solid ${theme.palette.contrastColor}`,
                  borderRadius: '10px',
                  width: '32px',
                  height: '32px',
                  backgroundImage: getChannelIcon(index, theme.palette.contrastColor, 1),
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'auto 80%',
                  cursor: 'pointer',
                  transition: 'filter 0.25s ease-in-out',
                  filter: (icon === index) ? 'brightness(100%)' : 'brightness(50%)'
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}