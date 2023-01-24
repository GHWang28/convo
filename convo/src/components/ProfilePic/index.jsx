import React from 'react';
import { Avatar } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { useDispatch } from 'react-redux';
import { setShowUserModal } from '../../redux/actions';

export default function ProfilePic ({ uid, alt, src, sx, ...props }) {
  const dispatch = useDispatch();
  const onClick = () => {
    if (!uid) return;
    dispatch(setShowUserModal(uid));
  }

  return (
    <BootstrapTooltip title={alt||'undefined'} placement='top'>
      <Avatar
        role='button'
        alt={alt || 'undefined'}
        src={src || `${process.env.PUBLIC_URL}/images/default-dp-white.svg`}
        {...props}
        sx={[
          (Boolean(uid)) && {
            transition: 'scale 0.25s ease-in-out',
            '&:hover': {
              scale: '1.25'
            },
            cursor: 'pointer',
            userSelect: 'none'
          },
          { ...sx }
        ]}
        onClick={onClick}
      />
    </BootstrapTooltip>
  )
}