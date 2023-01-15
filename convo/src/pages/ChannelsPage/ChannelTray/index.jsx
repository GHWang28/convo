import React, { Fragment, useState } from 'react';
import { Backdrop, Box, Collapse, useMediaQuery } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import ChannelTrayContent from './ChannelTrayContent';

export default function ChannelTray () {
  const [showChannelTray, setShowChannelTray] = useState(true);
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const onToggleTray = () => {
    setShowChannelTray(!showChannelTray);
  }

  const height = (mediumMq) ? '100%' : '100vh';

  return (
    <Fragment>
      <Box sx={{ position: (mediumMq) ? 'static' : 'absolute', display: 'flex', top: 0 }}>
        {/* Info with tray content */}
        <Collapse in={showChannelTray} orientation='horizontal' sx={{ zIndex: 2 }}>
          <ChannelTrayContent height={height} />
        </Collapse>

        {/* Tab */}
        {(mediumMq) ? (
          <Box
            role='button'
            sx={{
              height,
              width: '25px',
              bgcolor: 'mainColorLight',
              '&:hover': {
                filter: 'brightness(105%)'
              },
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 30px rgba(0,0,0,1)',
              clipPath: 'inset(0px -30px 0px 0px)',
              zIndex: 2
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
            mt='2vh'
            sx={{
              height: '40px',
              width: '40px',
              cursor: 'pointer',
              bgcolor: 'mainColorLight',
              zIndex: 2
            }}
            onClick={onToggleTray}
          >
            <MenuIcon sx={{ color: 'iconColor', height: '100%', width: '100%' }}/>
          </Box>
        )}
      </Box>
      <Backdrop
        open={!mediumMq && showChannelTray}
        sx={{ zIndex: 1 }}
        onClick={onToggleTray}
      />
    </Fragment>
  )
}