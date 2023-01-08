import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ChannelView () {
  const cid = useParams().cid;

  if (!cid) return (
    <Typography>
      UEIBFioersgbdkubkjbkibi
    </Typography>
  )

  return (
    <Typography>
      {cid}
    </Typography>
  )
}