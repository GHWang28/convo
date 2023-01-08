import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { setShowChannelSearchModal } from '../../redux/actions';

export default function ListItemChannel ({ channelData, closeSearchModal, showDesc, showPressed }) {
  const [hover, setHover] = useState(false);
  const currViewingChannel = useParams().cid;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Grid
      container
      mt={1}
      p={1}
      role='button'
      sx={{
        minHeight: (showDesc) ? '60px' : '50px',
        border: '1px solid whitesmoke',
        borderRadius: '5px',
        cursor: 'pointer',
        bgcolor: hover && 'rgba(255,255,255,0.25)',
        filter: (currViewingChannel === channelData.cid && showPressed) && 'brightness(50%)'
      }}
      onClick={() => {
        if (closeSearchModal) dispatch(setShowChannelSearchModal(false));
        navigate(`/channels/${channelData?.cid}`);
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
    >
      <Grid item xs={2}>
        {/* Possible Server Profile Picture */}
      </Grid>
      <Grid
        item
        xs={10}
        sx={{
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
          }}
        >
          {channelData.channelName}
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
      </Grid>
    </Grid>
  )
}