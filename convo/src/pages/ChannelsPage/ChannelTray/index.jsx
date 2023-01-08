import React, { Fragment, useState } from 'react';
import { Backdrop, Box, Collapse, useMediaQuery } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import TrayContent from './TrayContent';

export default function ChannelTray () {
  const [showChannelTray, setShowChannelTray] = useState(true);
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const onToggleTray = () => {
    setShowChannelTray(!showChannelTray);
  }

  const height = '100vh';

  return (
    <Fragment>
      <Box sx={{ position: (mediumMq) ? 'static' : 'absolute', display: 'flex' }}>
        {/* Info with tray content */}
        <Collapse in={showChannelTray} orientation='horizontal' sx={{ zIndex: 2 }}>
          <TrayContent height={height} />
        </Collapse>

        {/* Tab */}
        {(mediumMq) ? (
          <Box
            role='button'
            sx={{
              height,
              width: '25px',
              bgcolor: 'mainColorDark',
              '&:hover': {
                filter: 'brightness(110%)'
              },
              cursor: 'pointer',
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
        open={!mediumMq && showChannelTray}
        sx={{ zIndex: 0 }}
        onClick={onToggleTray}
      />
    </Fragment>
  )
}