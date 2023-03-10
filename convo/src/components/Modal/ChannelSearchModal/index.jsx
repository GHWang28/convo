import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import SearchIcon from '@mui/icons-material/Search';
import { setFetching, setShowChannelSearchModal } from '../../../redux/actions';
import { Box, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import { searchChannel } from '../../../firebase/database';
import ListItemChannel from '../../ListItemChannel';

export default function ChannelSearchModal () {
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState('');
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const onSearch = () => {
    dispatch(setFetching(true));
    searchChannel(searchTerm)
      .then((result) => {
        setSearched(searchTerm);
        setChannels(result);
      }).finally(() => {
        dispatch(setFetching(false));
      })
  }

  const onClose = () => {
    dispatch(setShowChannelSearchModal(false));
  }
  const onExited = () => {
    setChannels([]);
    setSearchTerm('');
    setSearched('');
  }
  
  return (
    <Modal
      open={useSelector(state => state.channelSearchModal)}
      title='Channel Search'
      handleClose={onClose}
      onExited={onExited}
      fullWidth
      fullScreen={!smallMq}
    >
      <TextField
        fullWidth
        label='Search Public Channels'
        title='Search Public Channels'
        value={searchTerm}
        InputProps={{
          sx: {
            bgcolor: 'mainColorNormal'
          },
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
      <Typography my={1}>
        {`Total Results: ${channels.length}`}
      </Typography>
      <Box
        p={1}
        sx={{
          maxHeight: '500px',
          overflowY: 'auto',
          bgcolor: 'mainColorNormal',
          borderRadius: '5px'
        }}
      >
        {(channels.length === 0) && (
          <Typography my={1} align='center'>
            {(searched)
              ? `No channels have a name similar to "${searched}".`
              : 'Search for Channels with similar names by entering keywords or by entering a Channel Tag (which is case-sensitive).'
            }
          </Typography>
        )}
        {channels.map((data) => (
          <ListItemChannel key={data?.cid} cid={data?.cid} closeSearchModal showDesc/>
        ))}
      </Box>
    </Modal>
  )
}