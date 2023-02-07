import React from 'react';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { setShowChannelCreateModal } from '../../redux/actions';
import BootstrapTooltip from '../BootstrapTooltip';

export default function ButtonCreateChannel () {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setShowChannelCreateModal(true));
  }

  return (
    <BootstrapTooltip title='Create a brand new channel' placement='right'>
      <IconButton onClick={onClick}>
        <AddCircleOutlineIcon />
      </IconButton>
    </BootstrapTooltip>
  )
}
