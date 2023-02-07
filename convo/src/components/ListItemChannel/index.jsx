import React from 'react';
import { Avatar, Box, LinearProgress, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { setShowChannelSearchModal } from '../../redux/actions';
import BootstrapTooltip from '../BootstrapTooltip';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getChannelDocRef } from '../../firebase/database';
import { getTextColor } from '../../helpers';
import TypographyTruncate from '../TypographyTruncate';
import PropTypes from 'prop-types';

export default function ListItemChannel ({ cid, closeSearchModal, showDesc, showPressed }) {
  const currViewingChannel = useParams().cid;
  const pressed = (currViewingChannel === cid && showPressed);
  const [channelData, loading, error] = useDocumentData(getChannelDocRef(cid));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (loading || error) {
    return (
      <Box
        mt={1}
        role='button'
        sx={{
          borderRadius: '5px',
          height: '42px',
          border: `1px solid ${(loading) ? 'black' : 'red'}`,
          overflow: 'clip',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {(loading) ? (
          <LinearProgress title='Loading' sx={{ height: '100%', width: '100%' }} />
        ) : (
          <Typography color='error.main' fontWeight='bold'>
            {'Error Loading'}
          </Typography>
        )}
      </Box>
    )
  }

  return (
    <BootstrapTooltip title={channelData?.name} placement='right'>
      <Box
        mt={1}
        p={1}
        role='button'
        sx={{
          WebkitTapHighlightColor: 'transparent',
          border: `1px solid ${channelData?.theme}`,
          borderRadius: '5px',
          display: 'flex',
          gap: 1,
          cursor: (!pressed) && 'pointer',
          transition: 'background-color 0.25s ease-in-out',
          '&:hover': {
            bgcolor: (!pressed) && 'highlightColor'
          },
          bgcolor: (pressed) && (channelData?.theme)
        }}
        onClick={() => {
          if (pressed) return;
          if (closeSearchModal) dispatch(setShowChannelSearchModal(false));
          navigate(`/channels/${channelData?.cid}`);
        }}
      >
        <Avatar
          alt={`${channelData?.name}`}
          sx={{ bgcolor: 'mainColorNormal' }}
          src={channelData?.channelPic || `${process.env.PUBLIC_URL}/images/default-channel-white.svg`}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: (showDesc) ? 'column' : 'row',
            alignItems: 'center'
          }}
        >
          <TypographyTruncate
            text={channelData.name}
            width='100%'
            sx={{
              fontWeight: 'bold',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              transition: 'color 0.25s ease-in-out',
              color: (pressed)
                ? getTextColor(channelData?.theme)
                : channelData?.theme
            }}
          />
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

ListItemChannel.propTypes = {
  cid: PropTypes.string.isRequired,
  closeSearchModal: PropTypes.bool,
  showDesc: PropTypes.bool,
  showPressed: PropTypes.bool
}
