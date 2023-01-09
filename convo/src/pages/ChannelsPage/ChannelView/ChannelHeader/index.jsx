import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getPublicPrivateSvgIcon } from '../../../../helpers';
import { useDispatch } from 'react-redux';
import { setShowChannelInfoModal } from '../../../../redux/actions';
import Settings from './Settings';
import TypographyTruncate from '../../../../components/TypographyTruncate';

export default function ChannelHeader ({ channelData }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        height: '110px',
        boxSizing: 'border-box',
        bgcolor: 'mainColorLight',
        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
        clipPath: 'inset(0px 0px -30px 0px)',
        pl: (!mediumMq) && '40px'
      }}
    >
      <Box
        p={1.5}
        pt={0.5}
        onClick={() => { dispatch(setShowChannelInfoModal(true, channelData.name, channelData.description, channelData.cid)) }}
        sx={{
          flexGrow: 1,
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
            width: '100%',
            height: '45%',
            boxSizing: 'border-box',
            borderBottomWidth: '1px',
            borderBottomColor: (channelData.publicMode) ? 'publicColor' : 'privateColor',
            borderBottomStyle: 'solid',
            backgroundImage: getPublicPrivateSvgIcon(channelData.publicMode, theme, 0.25),
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
          }}
        >
          <TypographyTruncate
            width='100%'
            text={channelData.name}
            sx={{ fontWeight: 'bold', fontSize: 20 }}
          />
        </Box>
        {/* Channel Description */}
        <Box sx={{ height: '50%', p: 1, boxSizing: 'border-box', bgcolor: 'mainColorDark', borderRadius: '5px' }}>
          <Typography fontWeight='bold' fontSize={15} sx={{ opacity: 0.5 }}>
            {channelData.description}
          </Typography>
        </Box>
      </Box>

      <Box
        px={1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'fit-content',
          boxSizing: 'border-box',
          height: '100%'
        }}
      >
        <Settings/>
      </Box>
    </Box>
  )
}