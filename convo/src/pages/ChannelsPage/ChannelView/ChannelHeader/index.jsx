import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { getPublicPrivateSvgIcon } from '../../../../helpers';
import { useDispatch } from 'react-redux';
import { setShowChannelInfoModal } from '../../../../redux/actions';

export default function ChannelHeader ({ channelData }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: '110px',
        boxSizing: 'border-box',
        bgcolor: 'mainColorLight',
        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
        clipPath: 'inset(0px 0px -30px 0px)',
        zIndex: 2
      }}
    >
      <Box
        p={1.5}
        pt={0.5}
        onClick={() => { dispatch(setShowChannelInfoModal(true, channelData.name, channelData.description, channelData.cid)) }}
        sx={{
          width: '95%',
          height: '100%',
          cursor: 'pointer',
          transition: 'background-color 0.25s ease-in-out',
          '&:hover': {
            bgcolor: 'highlightColor'
          },
          boxSizing: 'border-box',
        }}
      >
        {/* Channel Name */ }
        <Box
          p={1}
          mb={1}
          sx={{
            height: '45%',
            boxSizing: 'border-box',
            borderBottomWidth: '1px',
            borderBottomColor: (channelData.publicMode) ? 'publicColor' : 'privateColor',
            borderBottomStyle: 'solid',
            backgroundImage: getPublicPrivateSvgIcon(channelData.publicMode, theme, 0.25),
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%'
          }}
        >
          <Typography fontWeight='bold' fontSize={20}>
            {channelData.name}
          </Typography>
        </Box>
        {/* Channel Description */}
        <Box sx={{ height: '50%', p: 1, boxSizing: 'border-box', bgcolor: 'mainColorDark', borderRadius: '5px' }}>
          <Typography fontWeight='bold' fontSize={15} sx={{ opacity: 0.5 }}>
            {channelData.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}