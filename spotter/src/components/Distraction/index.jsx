import React from 'react';
import { Box, keyframes } from "@mui/material";

const slide = keyframes`
  0% {
    translate: 0% 0px;
  }
  100% {
    translate: -50% 0px;
  }
`;

function Distraction () {
  return (
    <Box
      name='distraction'
      height='100%'
      width='200vw'
      sx={{
        display: 'flex',
        zIndex: 50,
        left: 0,
        top: 0,
        animation: `${slide} 3.5s linear infinite`,
        position: 'absolute',
        pointerEvents: 'none'
      }}
    >
      <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
        {[...Array(2)].map((_, index) => (
          <Box
            key={`distraction-${index}`}
            height='100%'
            width='40%'
            sx={{
              bgcolor: 'rgb(60,60,60)',
              borderLeft: '2px solid whitesmoke',
              borderRight: '2px solid whitesmoke'
            }}
          />
        ))}
      </Box>
      <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
        {[...Array(2)].map((_, index) => (
          <Box
            key={`distraction-${index}`}
            height='100%'
            width='40%'
            sx={{
              bgcolor: 'rgb(60,60,60)',
              borderLeft: '2px solid whitesmoke',
              borderRight: '2px solid whitesmoke'
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Distraction;
