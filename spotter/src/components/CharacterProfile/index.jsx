import React from 'react';
import { Box, Typography, useMediaQuery } from "@mui/material";
import CharacterCoin from "../CharacterCoin";
import PropTypes from 'prop-types';

function CharacterProfile ({ characterID = -1, title = 'To Spot:' }) {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: (smallMq) ? '150px' : '100px',
        alignItems: 'center',
        boxShadow: '0px 0px 50px 10px rgba(0,0,0,0.5)',
        px: 2
      }}
    >
      <Typography fontSize={20}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <CharacterCoin
          correct
          characterID={characterID}
          size='130px'
        />
      </Box>
    </Box>
  )
}

CharacterProfile.propTypes = {
  characterID: PropTypes.number,
  title: PropTypes.string
};

export default CharacterProfile;
