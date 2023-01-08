import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';
import SearchIcon from '@mui/icons-material/Search';
import { setFetching, setShowChannelSearchModal } from '../../../redux/actions';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { searchChannel } from '../../../firebase/database';
import ListItemChannel from '../../ListItemChannel';

export default function ChannelSearchModal () {
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState('');

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
    setChannels([]);
    setSearchTerm('');
    setSearched('');
    dispatch(setShowChannelSearchModal(false));
  }
  
  return (
    <Modal
      open={useSelector(state => state.channelSearchModal)}
      title='Channel Search'
      handleClose={onClose}
      fullWidth
    >
      <TextField
        fullWidth
        label='Search Public Channels'
        value={searchTerm}
        InputProps={{
          sx: {
            bgcolor: 'trayColorBg'
          },
          endAdornment: (
            <IconButton onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          )
        }}
        onChange={(event) => { setSearchTerm(event.target.value) }}
      />
      <Typography my={1}>
        {`Total Results: ${channels.length}`}
      </Typography>
      <Box
        sx={{
          maxHeight: '500px',
          overflowY: 'auto',
          bgcolor: 'trayColorBg',
          borderRadius: '5px',
          p: 1,
        }}
      >
        {(channels.length === 0) && (
          <Typography my={1} align='center'>
            {(searched)
              ? `No channels have a name similar to "${searched}".`
              : 'Enter key words above to find Channels with similar names to the key words.'
            }
          </Typography>
        )}
        {channels.map((channelData) => (
          <ListItemChannel key={channelData?.cid} channelData={channelData} closeSearchModal showDesc/>
        ))}
      </Box>
    </Modal>
  )
}