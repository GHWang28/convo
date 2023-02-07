import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import BootstrapTooltip from '../BootstrapTooltip';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function TagDisplay ({ label, tag, color }) {
  const onCopy = () => {
    navigator.clipboard.writeText(`#${tag}`);
    toast.success(`Copied '#${tag}' to clipboard.`);
  }

  if (!tag) return null;

  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
      <Typography fontWeight='bold' align='center'>
        {label + ': '}
        <Box component='span' sx={{ fontWeight: 'normal', color }}>
          {`#${tag}`}
        </Box>
      </Typography>
      <BootstrapTooltip title='Copy Tag' placement='top'>
        <IconButton onClick={onCopy}>
          <ContentPasteIcon />
        </IconButton>
      </BootstrapTooltip>
    </Box>
  )
}

TagDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  tag: PropTypes.string,
  color: PropTypes.string
};
