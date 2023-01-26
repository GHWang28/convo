import React from 'react';
import { Box, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ButtonCreateChannel from '../../../components/ButtonCreateChannel';
import ButtonLogOut from '../../../components/ButtonLogOut';
import ListItemChannel from '../../../components/ListItemChannel';
import { setShowChannelSearchModal } from '../../../redux/actions';
import ProfilePic from '../../../components/ProfilePic';

export default function ChannelTrayContent ({ height }) {
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const userData = useSelector(state => state.loggedInUserData);
  const dispatch = useDispatch();

  const channelIdList = Object.keys(userData?.uidToCid || {}).sort((cidA, cidB) => (cidA.localeCompare(cidB)));

  return (
    <Box
      sx={[
        (!mediumMq) && { pr: 1 },
        {
          height,
          width: 'min(250px, calc(100vw - 40px))',
          bgcolor: 'mainColorLight',
          display: 'flex',
          flexDirection: 'column'
        }
      ]}
    >
      {/* Header */}
      <Box
        p={1}
        sx={{
          width: '100%',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
          clipPath: 'inset(0px 0px -30px 0px)',
          boxSizing: 'border-box',
        }}
      >
        <TextField
          sx={{ mb: 1 }}
          fullWidth
          title='Search Public Channels'
          placeholder='Search Public Channels'
          InputProps={{
            sx: { bgcolor: 'mainColorNormal', height: '35px' },
            readOnly: true,
            endAdornment: <SearchIcon />
          }}
          onClick={() => { dispatch(setShowChannelSearchModal(true)) }}
        />
        <Box sx={{ position: 'relative' }}>
          <Typography align='center' variant='h6'>
            {'Your Channels'}
          </Typography>
          <Box sx={{ position: 'absolute', right: 0, top: -5 }}>
            <ButtonCreateChannel />
          </Box>
        </Box>
      </Box>

      {/* Contains all channel items */}
      <Box
        sx={{
          width: '100%',
          overflowY: 'overlay',
          flexGrow: 1,
          boxSizing: 'border-box',
          bgcolor: 'mainColorNormal',
          p: 2
        }}
      >
        {Boolean(channelIdList.length) && channelIdList.map((cid) => (
          <ListItemChannel key={cid} cid={cid} showPressed />
        ))}
      </Box>
      {/* Footer */}
      <Grid
        container
        sx={{
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
          clipPath: 'inset(-30px 0px 0px 0px)',
          width: '100%',
          height: '60px',
          alignItems: 'center'
        }}
      >
        <Grid item xs={3}>
          <ProfilePic
            sx={{ ml: 2 }}
            uid={userData?.uid}
            alt={userData?.handle}
            src={userData?.profilePic}
          />
        </Grid>
        <Grid item xs={7}>
          <Typography fontWeight='bold'>
            {userData?.handle}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <ButtonLogOut small/>
        </Grid>
      </Grid>
    </Box>
  )
}
