import React, { Fragment, useEffect, useState } from 'react';
import { Backdrop, Box, Collapse, useMediaQuery } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import ChannelTrayContent from './ChannelTrayContent';
import { useSwipeable } from 'react-swipeable';

export default function ChannelTray () {
  const [showChannelTray, setShowChannelTray] = useState(true);
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const onToggleTray = () => {
    setShowChannelTray(!showChannelTray);
  }

  const { ref: documentRef } = useSwipeable({
    delta: 50,
    onSwipedRight: () => { setShowChannelTray(true) },
    onSwipedLeft: () => { setShowChannelTray(false) }
  });

  useEffect(() => {
    // Adds swipeable to the document
    documentRef(document);
  }, [documentRef]);

  const height = (mediumMq) ? '100%' : '100vh';

  return (
    <Fragment>
      <Box sx={{ position: (mediumMq) ? 'static' : 'absolute', display: 'flex', top: 0, zIndex: 4 }}>
        {/* Info with tray content */}
        <Collapse in={showChannelTray} orientation='horizontal'>
          <ChannelTrayContent height={height} />
        </Collapse>

        {/* Tab */}
        {(mediumMq) && (
          <Box
            role='button'
            sx={{
              height,
              WebkitTapHighlightColor: 'transparent',
              width: '25px',
              bgcolor: 'mainColorLight',
              '&:hover': { filter: 'brightness(105%)' },
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 30px rgba(0,0,0,1)',
              clipPath: 'inset(0px -30px 0px 0px)'
            }}
            onClick={onToggleTray}
          >
            <ArrowRightIcon
              sx={{
                color: 'contrastColor',
                rotate: (showChannelTray) ? '-180deg' : '0deg',
                transition: 'rotate 0.25s ease-in-out'
              }}
              fontSize='large'
            />
          </Box>
        )}
      </Box>
      {(!mediumMq) && (
        <Box
          mt='2vh'
          sx={{
            top: 0,
            WebkitTapHighlightColor: 'transparent',
            position: 'absolute',
            height: '40px',
            width: '40px',
            cursor: 'pointer',
            zIndex: 2
          }}
          onClick={onToggleTray}
        >
          <MenuIcon sx={{ color: 'contrastColor', height: '100%', width: '100%' }}/>
        </Box>
      )}
      <Backdrop
        open={!mediumMq && showChannelTray}
        sx={{ zIndex: 2 }}
        onClick={onToggleTray}
      />
    </Fragment>
  )
}