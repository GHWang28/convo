import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import SearchIcon from '@mui/icons-material/Search';
import { setShowChannelMemberModal } from '../../../redux/actions';
import { Box, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import ListItemUser from '../../ListItemUser';
import { getArrayOfUserData } from '../../../firebase/database';

export default function ChannelMemberModal () {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const userIDArray = useSelector(state => state.channelMemberModal);
  const [userArray, setUserArray] = useState([]);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const onSearch = () => {
    setPrevSearch(searchTerm);
  }

  const onClose = () => {
    setPrevSearch('');
    dispatch(setShowChannelMemberModal(''));
  }
  const onExited = () => {
    setUserArray([]);
  }

  useEffect(() => {
    if (!Boolean(userIDArray)) return;

    getArrayOfUserData(userIDArray).then(setUserArray)
  }, [userIDArray])

  const displayedUser = userArray.filter((userData) => (
    userData?.handle.toLowerCase().startsWith(prevSearch.toLowerCase())
  ));

  return (
    <Modal
      open={userIDArray.length > 0}
      title='Channel Members'
      handleClose={onClose}
      onExited={onExited}
      fullWidth
      fullScreen={!smallMq}
    >
      <TextField
        fullWidth
        label='Search Members in Channel'
        value={searchTerm}
        InputProps={{
          sx: { bgcolor: 'mainColorNormal' },
          endAdornment: (
            <IconButton onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          )
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onSearch();
          }
        }}
        onChange={(event) => { setSearchTerm(event.target.value) }}
      />
      <Box
        mt={2}
        sx={{
          maxHeight: '500px',
          overflowY: 'auto',
          bgcolor: 'mainColorNormal',
          borderRadius: '5px',
          p: 1,
        }}
      >
        {(displayedUser?.length === 0) && (
          <Typography my={1} align='center'>
            {(prevSearch) ? (
              `No members have a handle beginning with "${prevSearch}".`
            ) : (
              'No members were found.'
            )}
          </Typography>
        )}
        {displayedUser.map((userData) => (
          <ListItemUser key={userData?.uid} userData={userData}/>
        ))}
      </Box>
    </Modal>
  )
}