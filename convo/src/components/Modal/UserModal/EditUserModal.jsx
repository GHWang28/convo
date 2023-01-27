import React, { useEffect, useState } from 'react';
import { Alert, TextField, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '..';
import { setShowEditUserModal } from '../../../redux/actions';
import { auth } from '../../../firebase';
import { recordNewUser } from '../../../firebase/database';
import { useNavigate } from 'react-router';
import { genTag } from '../../../helpers';
import config from '../../../config.json';
import ImageUploader from '../../ImageUploader';


export default function EditUserModal () {
  const newUserData = useSelector(state => state.editUserModal);
  const [newUserDataState, setNewUserDataState] = useState(null);
  const editMode = Boolean(newUserDataState?.editMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState([]);
  const invalidHandle = !(handle.length >= config.MIN_HANDLE_NAME && handle.length <= config.MAX_HANDLE_NAME) || handle.charAt(0) === '#';

  const onClose = () => {
    if (!editMode) {
      auth.signOut()
    };
    dispatch(setShowEditUserModal(null));
  }
  const onConfirm = () => {
    if (invalidHandle) {
      toast.error(`Your handle name must be inclusively between ${config.MIN_HANDLE_NAME} to ${config.MAX_HANDLE_NAME} characters long. The handle must also not start with '#'.`)
      return;
    }

    let userDataPackage = {
      handle,
      bio,
      profilePic: profilePic?.at(0)?.dataURL || '',
      uid: newUserDataState?.uid
    }
    if (newUserDataState?.creationTime) {
      // If creation time is included, then  this is a new account to record.
      // Fix creation time and add short uuid
      userDataPackage.creationTime = new Date(newUserDataState?.creationTime);
      userDataPackage.tag = genTag();
    }

    recordNewUser(userDataPackage).then(() => {
      if (!editMode) {
        navigate('/channels');
      }
      dispatch(setShowEditUserModal(null));
    })
  }

  useEffect(() => {
    setHandle(newUserDataState?.displayName || '');
    setProfilePic((newUserDataState?.photoURL) ? [{ dataURL: newUserDataState?.photoURL }] : '');
  }, [newUserDataState]);
  useEffect(() => {
    if (newUserData === null) return;
    setNewUserDataState({...newUserData});
  }, [newUserData])


  return (
    <Modal
      open={Boolean(newUserData) && Boolean(auth.currentUser)}
      handleClose={onClose}
      closeColor='error'
      closeTitle={(editMode) ? 'Close' : 'Sign out'}
      handleConfirm={onConfirm}
      confirmColor='success'
      confirmTitle={(editMode) ? 'Save' : 'Create Account'}
      title={(editMode) ? 'Edit your Profile' : 'Greetings, New User!'}
      subtitle={(editMode) ? 'Re-identify yourself' : 'Set up your new account'}
      fullWidth
      fullScreen={!smallMq}
    >
      <ImageUploader imageArray={profilePic} setImageArray={setProfilePic} alt={handle || 'You'}/>
      <TextField
        sx={{ mt: 0.5 }}
        InputProps={{ sx: { bgcolor: 'mainColorNormal' } }}
        label='Handle Name *'
        helperText={`The name other users will know you by. Must be inclusively between ${config.MIN_HANDLE_NAME}-${config.MAX_HANDLE_NAME} characters long and not start with '#'.`}
        variant='outlined'
        fullWidth
        value={handle}
        error={invalidHandle}
        onChange={(event) => { setHandle(event.target.value) }}
      />
      <TextField
        sx={{ mt: 1.5 }}
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
      {(editMode) && (
        <Alert severity='warning' sx={{ mt: 3 }}>
          {'Changes may not reflect immediately.'}
        </Alert>
      )}
    </Modal>
  )
}
