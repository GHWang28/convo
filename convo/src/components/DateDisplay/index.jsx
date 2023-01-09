import { Typography } from '@mui/material';
import { useState } from 'react';
import { convertEpochToDate } from '../../helpers';

export default function DateDisplay ({ time, fontSize = 11, align, shorten }) {
  return (
    <Typography
      color='secondary'
      fontSize={fontSize}
      align={align}
      mb={1}
    >
      {convertEpochToDate(time, shorten)}
    </Typography>
  )
}
