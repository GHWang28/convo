import { Avatar, Backdrop, Box, Collapse, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonLogOut from '../../components/ButtonLogOut';
import ButtonCreateChannel from '../../components/ButtonCreateChannel';

function TrayItems ({ height }) {
  const userData = useSelector(state => state.loggedInUserData);

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
      <TextField
        sx={{ m: 1 }}
        defaultValue='Search Public Channels'
        InputProps={{
          readOnly: true,
          endAdornment: <SearchIcon />
        }}
      />
      <Typography align='center' variant='h6'>
        {'Your Channels'}
      </Typography>
      <Box
        component='hr'
        sx={{
          width: '100%',
          opacity: '0.5'
        }}
      />
      <Box
        sx={{
          width: '100%',
          overflowY: 'overlay',
          flexGrow: 1,
          boxSizing: 'border-box',
          px: 2
        }}
      >
        <ButtonCreateChannel />
      </Box>
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

export default function ChannelTray () {
  const [showChannelTray, setShowChannelTray] = useState(true);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const onToggleTray = () => {
    setShowChannelTray(!showChannelTray);
  }

  const height = '100vh';

  return (
    <Fragment>
      <Box
        sx={{
          position: (smallMq) ? 'static' : 'absolute',
          display: 'flex'
        }}
      >
        {/* Info */}
        <Collapse in={showChannelTray} orientation='horizontal' sx={{ zIndex: 2 }}>
          <TrayItems height={height} />
        </Collapse>
        {/* Tab */}
        {(smallMq) ? (
          <Box
            role='button'
            sx={{
              height,
              width: '40px',
              bgcolor: 'trayTabColorBg',
              cursor: 'pointer',
              borderRight: '2px solid gray',
              borderLeft: '2px solid gray',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={onToggleTray}
          >
            <ArrowRightIcon
              sx={{
                color: 'iconColor',
                rotate: (showChannelTray) ? '-180deg' : '0deg',
                transition: 'rotate, 0.25s ease-in-out'
              }}
              fontSize='large'
            />
          </Box>
        ) : (
          <Box
            sx={{
              height: '40px',
              width: '40px',
              cursor: 'pointer',
              zIndex: 2
            }}
            onClick={onToggleTray}
          >
            <MenuIcon sx={{ color: 'iconColor', height: '100%', width: '100%' }}/>
          </Box>
        )}
      </Box>
      <Backdrop
        open={!smallMq && showChannelTray}
        sx={{ zIndex: 0 }}
        onClick={onToggleTray}
      />
    </Fragment>
  )
}