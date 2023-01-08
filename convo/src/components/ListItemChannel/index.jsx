import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { setShowChannelSearchModal } from '../../redux/actions';
import BootstrapTooltip from '../BootstrapTooltip';

export default function ListItemChannel ({ channelData, closeSearchModal, showDesc, showPressed }) {
  const currViewingChannel = useParams().cid;
  const pressed = (currViewingChannel === channelData.cid && showPressed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <BootstrapTooltip title={channelData?.name} placement='right'>
      <Box
        mt={1}
        p={1}
        role='button'
        sx={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (channelData.publicMode) ? 'publicColor' : 'privateColor',
          borderRadius: '5px',
          display: 'flex',
          cursor: (!pressed) && 'pointer',
          transition: 'background-color 0.25s ease-in-out',
          '&:hover': {
            bgcolor: (!pressed) && 'highlightColor'
          },
          bgcolor: (pressed) && ((channelData.publicMode) ? 'publicColor' : 'privateColor')
        }}
        onClick={() => {
          if (pressed) return;
          if (closeSearchModal) dispatch(setShowChannelSearchModal(false));
          navigate(`/channels/${channelData?.cid}`);
        }}
      >
        <Box sx={{ width: (showDesc) ? '48px' : '24px'}}>
          {/* Possible Server Profile Picture */}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: (showDesc) ? 'column' : 'row',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: '95%',
              transition: 'color 0.25s ease-in-out',
              color: (pressed)
                ? 'black'
                : (channelData.publicMode) ? 'publicColor' : 'privateColor'
            }}
          >
            {channelData.name}
          </Typography>
          {(showDesc) && (
            <Typography
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '95%'
              }}
              color='secondary'
            >
              &nbsp;&nbsp;{channelData.description || 'No Description'}
            </Typography>
          )}
        </Box>
      </Box>
    </BootstrapTooltip>
  )
}