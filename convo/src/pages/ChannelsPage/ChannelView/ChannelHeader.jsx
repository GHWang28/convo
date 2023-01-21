import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { getChannelIcon } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { setShowChannelInfoModal } from '../../../redux/actions';
import Settings from './ChannelSettings';
import TypographyTruncate from '../../../components/TypographyTruncate';

export default function ChannelHeader ({ channelData }) {
  const dispatch = useDispatch();
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '110px',
        boxSizing: 'border-box',
        bgcolor: 'mainColorLight',
        boxShadow: '0 0 30px rgba(0,0,0,1)',
        clipPath: 'inset(0px 0px -30px 0px)',
        pl: (!mediumMq) && '40px',
        zIndex: 1
      }}
    >
      <Box
        p={1.5}
        pt={0.5}
        onClick={() => { dispatch(setShowChannelInfoModal(true, channelData)) }}
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
            borderBottomColor: channelData?.theme,
            borderBottomStyle: 'solid',
            backgroundImage: getChannelIcon(channelData?.iconIndex, channelData?.theme, 0.5),
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
          }}
        >
          <TypographyTruncate
            width='100%'
            text={channelData?.name}
            sx={{ fontWeight: 'bold', fontSize: 20, color: channelData.theme }}
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          boxSizing: 'border-box',
          height: '100%'
        }}
      >
        <Settings channelData={channelData}/>
      </Box>
    </Box>
  )
}