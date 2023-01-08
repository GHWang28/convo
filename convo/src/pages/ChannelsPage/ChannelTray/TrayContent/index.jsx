import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToChannelList } from "../../../../firebase/database";
import SearchIcon from '@mui/icons-material/Search';
import ButtonCreateChannel from "../../../../components/ButtonCreateChannel";
import ButtonLogOut from "../../../../components/ButtonLogOut";
import ListItemChannel from "../../../../components/ListItemChannel";
import { setShowChannelSearchModal } from "../../../../redux/actions";

export default function TrayContent ({ height }) {
  const userData = useSelector(state => state.loggedInUserData);
  const dispatch = useDispatch();
  const [ channels, setChannels ] = useState([]);

  useEffect(() => {
    // Listens to the channel list
    return subscribeToChannelList(userData?.uid, setChannels, dispatch);
  }, [userData, dispatch]);

  return (
    <Box
      sx={{
        height,
        width: 'min(300px, calc(100vw - 60px))',
        bgcolor: 'trayColorBg',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
          clipPath: 'inset(0px 0px -30px 0px)',
          p: 1,
          bgcolor: 'trayFooterColor',
          boxSizing: 'border-box'
        }}
      >
        <TextField
          sx={{ mb: 1 }}
          fullWidth
          defaultValue='Search Public Channels'
          InputProps={{
            sx: {
              bgcolor: 'trayColorBg'
            },
            readOnly: true,
            endAdornment: <SearchIcon />
          }}
          onClick={() => { dispatch(setShowChannelSearchModal(true)) }}
        />

        <Typography align='center' variant='h6'>
          {'Your Channels'}
        </Typography>
      </Box>
      {/* Contains all channel items */}
      <Box
        sx={{
          width: '100%',
          overflowY: 'overlay',
          flexGrow: 1,
          boxSizing: 'border-box',
          p: 2
        }}
      >
        <ButtonCreateChannel />
        {channels.map((data) => (
          <ListItemChannel key={data?.cid} channelData={data} showPressed />
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
          bgcolor: 'trayFooterColor',
          alignItems: 'center'
        }}
      >
        <Grid item xs={3}>
          <Avatar
            sx={{
              ml: 2
            }}
            alt={userData?.handler}
            src={userData?.profilePic}
            referrerPolicy='origin'
          />
        </Grid>
        <Grid item xs={7}>
          <Typography fontWeight='bold'>
            {userData?.handler}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <ButtonLogOut small/>
        </Grid>
      </Grid>
    </Box>
  )
}