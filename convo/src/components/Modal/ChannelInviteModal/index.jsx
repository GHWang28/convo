import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import SearchIcon from '@mui/icons-material/Search';
import { setShowChannelInviteModal } from '../../../redux/actions';
import { Box, Chip, Collapse, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import ListItemUser from '../../ListItemUser';
import { searchUser } from '../../../firebase/database';
import ChipContainer from '../../ChipContainer';
import ProfilePic from '../../ProfilePic';

export default function ChannelInviteModal () {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const excludedUserIDArray = useSelector(state => state.channelInviteModal);
  const [userArray, setUserArray] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const onSearch = () => {
    setPrevSearch(searchTerm);
  }

  const onClose = () => {
    setPrevSearch('');
    dispatch(setShowChannelInviteModal([]));
  }
  const onExited = () => {
    setUserArray([]);
    setPrevSearch('');
    setSearchTerm('');
    setUserSelected([]);
  }

  useEffect(() => {
    if (prevSearch.length === 0) {
      setUserArray([]);
      return;
    };

    searchUser(prevSearch).then((users) => {
      setUserArray(users.filter((userData) => ( !excludedUserIDArray.includes(userData?.uid) )))
    })
  }, [prevSearch, excludedUserIDArray]);

  return (
    <Modal
      open={excludedUserIDArray.length > 0}
      title='Invite Someone'
      handleClose={onClose}
      onExited={onExited}
      fullWidth
      fullScreen={!smallMq}
    >
      <TextField
        fullWidth
        label='Search for Users'
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
        {(userArray?.length === 0) && (
          <Typography my={1} align='center'>
            {(prevSearch) ? (
              `No users have a handle beginning with "${prevSearch}".`
            ) : (
              'No users were found.'
            )}
          </Typography>
        )}
        {userArray.map((userData) => (
          <ListItemUser
            key={userData?.uid}
            userData={userData}
            onClick={() => {
              // Finding User
              const index = userSelected.findIndex((userItem) => ( userItem?.uid === userData?.uid));
              if (index === -1) {
                const newUserSelected = {
                  handle: userData?.handle,
                  uid: userData?.uid,
                  profilePic: userData?.profilePic
                };
                setUserSelected([...userSelected, newUserSelected]);
              } else {
                const newArray = [...userSelected];
                newArray.splice(index, 1);
                setUserSelected(newArray);
              }
            }}
          />
        ))}
      </Box>
      <Collapse in={userSelected.length !== 0}>
        <Typography sx={{ mt: 2 }} fontWeight='bold'>
          {'Users to invite:'}
        </Typography>
        <ChipContainer sx={{ mt: 1 }}>
          {userSelected.map((userItem, index) => (
            <Chip
              label={userItem?.handle}
              key={`user-${index}`}
              avatar={
                <ProfilePic
                  uid={userItem?.uid}
                  alt={userItem?.handle}
                  src={userItem?.profilePic}
                />
              }
            />
          ))}
        </ChipContainer>
      </Collapse>
    </Modal>
  )
}