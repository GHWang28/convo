import React, { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types'

function LevelDisplay ({ level }) {
  return (
    <Typography
      align='center'
      mt='auto'
      mb='auto'
      sx={{
        userSelect: 'none',
        position: 'absolute',
        left: '50%',
        top: '50%',
        translate: '-50% -50%',
        color: 'whitesmoke',
        opacity: '0.2',
        textTransform: 'uppercase'
      }}
      fontSize={'min(70px, 7vw)'}
    >
      {
        (level === 0)
          ? 'Spot the first character to start'
          : `Level`
      }
      {(level > 0) && (
        <Fragment>
          <br />
          <Box
            component='span'
            sx={{
              fontSize: 'min(200px, 20vw)',
              lineHeight: '0.6em'
            }}
          >
            {level}
          </Box>
        </Fragment>
      )}
    </Typography>
  )
}

LevelDisplay.propTypes = {
  level: PropTypes.number.isRequired, 
};

export default LevelDisplay;
