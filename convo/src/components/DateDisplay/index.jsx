import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { convertEpochToDate } from '../../helpers';
import { animated, useTransition } from 'react-spring';

export default function DateDisplay ({ time, fontSize = 9, align }) {
  const [shorten, setShorten] = useState(true);
  const transitions = useTransition(shorten, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const AnimatedTypography = animated(Typography);

  return (
    <Box
      sx={{ position: 'relative', height: fontSize * 1.2 }}
    >
      {transitions((style, toShorten) => (
        <AnimatedTypography
          style={style}
          color='secondary'
          fontSize={fontSize}
          align={align}
          onClick={() => { setShorten(!shorten) }}
          sx={{
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer',
            userSelect: 'none',
            width: 'fit-content',
            position: 'absolute',
            top: 0,
            right: (align === 'right') && 0,
            left: (align === 'left') && 0
          }}
        >
          {convertEpochToDate(time, toShorten)}
        </AnimatedTypography>
      ))}
    </Box>
  )
}
