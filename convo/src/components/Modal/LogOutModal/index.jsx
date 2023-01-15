import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import { auth } from '../../../firebase';
import { setLogUserOut, setShowLogOutModal } from '../../../redux/actions';

export default function LogOutModal () {
  const dispatch = useDispatch();

  return (
    <Modal
      open={useSelector(state => state.logOutModal)}
      handleClose={() => { dispatch(setShowLogOutModal(false)) }}
      title='Log out'
      handleConfirm={() => {
        auth.signOut();
        dispatch(setLogUserOut());
        dispatch(setShowLogOutModal(false));
        sessionStorage.removeItem('uniqueSess');
      }}
      confirmColor='error'
    >
      <Typography fontSize={20}>
        {'Are you sure you want to log out?'}
      </Typography>
    </Modal>
  )
}