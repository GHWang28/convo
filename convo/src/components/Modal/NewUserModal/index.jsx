import { Avatar, Badge, badgeClasses, Box, Button, Collapse, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '..';
import { setShowNewUserModal } from '../../../redux/actions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import BootstrapTooltip from '../../BootstrapTooltip';
import { auth } from '../../../firebase';
import { recordNewUser } from '../../../firebase/database';
import { useNavigate } from 'react-router';
import { compressImage } from '../../../helpers';
import config from '../../../config.json';

export default function NewUserModal () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const newUserData = useSelector(state => state.newUserModal);
  const [handle, setHandle] = useState('');
  const invalidHandle = !(handle.length >= config.MIN_HANDLE_NAME && handle.length <= config.MAX_HANDLE_NAME);
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState([]);

  const onClose = () => {
    auth.signOut();
    dispatch(setShowNewUserModal(null));
  }

  const onImageChange = (newImage) => {
    (newImage.at(0)?.dataURL) ? compressImage(newImage.at(0)?.file, setProfilePic) : setProfilePic(newImage);
  }

  const onConfirm = () => {
    if (invalidHandle) {
      toast.error(`Your handle name must be inclusively between ${config.MIN_HANDLE_NAME} to ${config.MAX_HANDLE_NAME} characters long.`)
      return;
    }
    recordNewUser({
      handle,
      bio: '',
      profilePic: profilePic?.at(0)?.dataURL || '',
      uid: newUserData?.uid
    }).then(() => {
      dispatch(setShowNewUserModal(null));
      navigate('/channels');
    })
  }

  useEffect(() => {
    setHandle(newUserData?.displayName || '');
    setProfilePic((newUserData?.photoURL) ? [{ dataURL: newUserData?.photoURL }] : '');
  }, [newUserData]);

  const imageSize = { height: '150px', width: '150px' };

  return (
    <Modal
      open={Boolean(newUserData) && Boolean(auth.currentUser)}
      handleClose={onClose}
      closeColor='error'
      closeTitle='Sign out'
      handleConfirm={onConfirm}
      confirmColor='success'
      confirmTitle='Create Account'
      title='Greetings, New User!'
      subtitle='Set up your new account'
      fullWidth
      fullScreen={!smallMq}
    >
      <Box mb={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <ReactImageUploading
          value={profilePic}
          onChange={onImageChange}
          onError={(errors) => {
            if (errors.acceptType) toast.error('File type not accepted. Must be jpg or png.');
          }}
          acceptType={['jpg', 'png']}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <Fragment>
              {(isDragging) && (
                <Box
                  sx={{
                    ...imageSize,
                    position: 'absolute',
                    top: 0,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2
                  }}
                >
                  <Typography align='center' fontWeight='bold'>
                    {'Drop image here to upload'}
                  </Typography>
                </Box>
              )}
              <Badge
                color='secondary'
                overlap='circular'
                badgeContent={
                  <BootstrapTooltip title='Upload new picture' placement='top'>
                    <IconButton
                      sx={{
                        scale: (isDragging) ? 0 : 1,
                        transition: 'scale 0.3s ease-in-out',
                        color: 'mainColorNormal',
                        border: `5px solid ${theme.palette.mainColorLight}`,
                        bgcolor: 'rgb(255,255,255)',
                        "&:hover, &.Mui-focusVisible": {
                          bgcolor: 'rgb(230,230,230)'
                        }
                      }}
                      onClick={onImageUpload}
                    >
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </BootstrapTooltip>
                }
                sx={{ [`& .${badgeClasses.badge}`]: {
                  width: '0px',
                  height: '0px',
                } }}
              >
                <Avatar
                  {...dragProps}
                  alt={handle || 'You'}
                  title={handle || 'You'}
                  src={imageList?.at(0)?.dataURL || `${process.env.PUBLIC_URL}/images/default-dp-white.svg`}
                  sx={{ ...imageSize, bgcolor: 'mainColorNormal' }}
                />
              </Badge>
              <Collapse in={Boolean(profilePic)} sx={{ m: 1 }}>
                <Button startIcon={<DeleteIcon />} onClick={() => { onImageRemove(0) }} variant='contained' color='error' size='small'>
                  {'Delete Profile Picture'}
                </Button>
              </Collapse>
            </Fragment>
          )}
        </ReactImageUploading>
        <Typography align='center' color='secondary' fontSize={14}>
          {'[To change profile picture: Click icon or drag/drop new image onto existing picture]'}
        </Typography>
      </Box>
      <TextField
        sx={{ mt: 3 }}
        InputProps={{ sx: { bgcolor: 'mainColorNormal' } }}
        label='Handle Name *'
        helperText={`The name other users will know you by. Must be inclusively between ${config.MIN_HANDLE_NAME}-${config.MAX_HANDLE_NAME} characters long.`}
        variant='outlined'
        fullWidth
        value={handle}
        error={invalidHandle}
        onChange={(event) => { setHandle(event.target.value) }}
      />
      <TextField
        sx={{ mt: 3 }}
        InputProps={{ sx: { bgcolor: 'mainColorDark' } }}
        label='Bio'
        helperText='A description of yourself. Completely optional.'
        variant='outlined'
        fullWidth
        onChange={(event) => { setBio(event.target.value) }}
        value={bio}
        multiline
        maxRows={5}
      />
    </Modal>
  )
}
