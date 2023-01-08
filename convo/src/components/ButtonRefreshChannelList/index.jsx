import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserChannel } from '../../firebase/database';
import { setFetching } from '../../redux/actions';

export default function ButtonRefreshChannelList ({ setChannels }) {
  const userData = useSelector(state => state.loggedInUserData);
  const dispatch = useDispatch();

  const onClick = () => {
    if (!userData?.uid) return;

    dispatch(setFetching(true));
    getUserChannel(userData.uid)
      .then((allChannelData) => {
        setChannels(allChannelData);
      })
      .finally(() => {
        dispatch(setFetching(false));
      })
  }

  return (
    <IconButton onClick={onClick}>
      <RefreshIcon />
    </IconButton>
  )
}