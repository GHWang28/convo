import React from 'react';
import { Box, useTheme } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import TypographyTruncate from '../TypographyTruncate';
import ProfilePic from '../ProfilePic';
import { useDispatch } from 'react-redux';
import { setShowUserModal } from '../../redux/actions';

export default function ListItemUser ({ userData, onClick }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <BootstrapTooltip title={userData?.handle} placement='left'>
      <Box
        mt={1}
        p={1}
        role='button'
        sx={{
          border: `1px solid ${theme.palette.contrastColor}`,
          borderRadius: '5px',
          display: 'flex',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'highlightColor' },
        }}
        onClick={(onClick) ? onClick : () => { dispatch(setShowUserModal(userData?.uid)) }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <ProfilePic alt={userData?.handle} src={userData?.profilePic} />
          <Box>
            <TypographyTruncate text={userData?.handle} width='100%' sx={{ fontWeight: 'bold' }}/>
            <TypographyTruncate text={'\xa0\xa0' + (userData?.bio || 'No Bio')} width='100%' sx={{ color: 'secondary.main' }}/>
          </Box>
        </Box>
      </Box>
    </BootstrapTooltip>
  )
}