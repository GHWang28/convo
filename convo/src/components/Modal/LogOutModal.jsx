import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '.';
import { auth } from '../../Firebase';
import { setLogUserOut, setShowLogOutModal } from '../../redux/actions';

export default function LogOutModal () {
  const logOutModal = useSelector(state => state.logOutModal);
  const dispatch = useDispatch();

  return (
    <Modal
      open={logOutModal}
      handleClose={() => { dispatch(setShowLogOutModal(false)) }}
      title={'Log out'}
      subtitle={'Are you sure you want to log out?'}
      handleConfirm={() => { auth.signOut(); dispatch(setLogUserOut()); dispatch(setShowLogOutModal(false)) }}
      confirmColor='error'
    />
  )
}