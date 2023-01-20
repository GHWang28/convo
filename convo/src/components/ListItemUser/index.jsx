import React from 'react';
import { Avatar, Box, useTheme } from "@mui/material";
import BootstrapTooltip from "../BootstrapTooltip";
import TypographyTruncate from "../TypographyTruncate";

export default function ListItemUser ({ userData }) {
  const theme = useTheme();

  return (
    <BootstrapTooltip title={userData?.handle} placement='left'>
      <Box
        mt={1}
        p={1}
        role='button'
        sx={{
          border: `1px solid ${theme.palette.constrastColor}`,
          borderRadius: '5px',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => { alert('Work in Progress - Under construction') }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar alt={userData?.handle} src={userData?.profilePic || `${process.env.PUBLIC_URL}/images/default-dp-white.svg`} />
          <Box>
            <TypographyTruncate text={userData?.handle} width='100%'/>
            <TypographyTruncate text={'\xa0\xa0' + (userData?.bio || 'No Bio')} width='100%' sx={{ color: 'secondary.main' }}/>
          </Box>
        </Box>
      </Box>
    </BootstrapTooltip>
  )
}