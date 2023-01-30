import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { convertEpochToDate, getMillisecondsToTomorrow } from '../../helpers';
import { animated, useTransition } from 'react-spring';

const DATE_REF_ENUM = {
  TODAY: 1,
  YESTERDAY: 2,
  LONG_AGO: 0
}

export default function DateDisplay ({ time, fontSize = 9, align }) {
  const [dateRef, setDateRef] = useState(0);
  const [shorten, setShorten] = useState(true);
  useEffect(() => {
    const updateTime = () => {
      // Calculate the day for timestamp, in seconds and for time now, in milliseconds
      const timestampDay = Math.round((time) / 86400);
      const todayDay =  Math.round(Date.now() / 8.64e+7);

      if (timestampDay === todayDay) {
        setDateRef(DATE_REF_ENUM.TODAY);
      } else if (todayDay - timestampDay === 1) {
        setDateRef(DATE_REF_ENUM.YESTERDAY);
      } else {
        setDateRef(DATE_REF_ENUM.LONGAGO);
      }
    };
    const timeout = setTimeout(updateTime, getMillisecondsToTomorrow());
    updateTime();

    return () => { clearTimeout(timeout) }
  }, [time])
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
          <Box component = 'span' fontWeight='bold'>
            {(dateRef === DATE_REF_ENUM.TODAY && toShorten) && (
              '[Today] '
            )}
            {(dateRef === DATE_REF_ENUM.YESTERDAY && toShorten) && (
              '[Yesterday] '
            )}
          </Box>
          {convertEpochToDate(time, toShorten)}
        </AnimatedTypography>
      ))}
    </Box>
  )
}
