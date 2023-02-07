import React from 'react';
import { Avatar } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { useDispatch } from 'react-redux';
import { setShowUserModal } from '../../redux/actions';
import PropTypes from 'prop-types';

export default function ProfilePic ({ uid, alt, src, placeholderSrc = `default-dp-white.svg`, sx, hideTooltip = false, ...props }) {
  const dispatch = useDispatch();
  const onClick = () => {
    if (!uid) return;
    dispatch(setShowUserModal(uid));
  }

  const avatar = (
    <Avatar
      role='button'
      alt={alt || 'undefined'}
      src={src || `${process.env.PUBLIC_URL}/images/${placeholderSrc}`}
      {...props}
      sx={[
        (Boolean(uid)) && {
          transition: 'scale 0.25s ease-in-out',
          '&:hover': {
            scale: '1.1'
          },
          cursor: 'pointer',
          userSelect: 'none'
        },
        {
          ...sx,
          WebkitTapHighlightColor: 'transparent'
        }
      ]}
      onClick={onClick}
    />
  )

  return (hideTooltip) ? (
    avatar
  ) : (
    <BootstrapTooltip title={alt || 'undefined'} placement='top'>
      {avatar}
    </BootstrapTooltip>
  )
}

ProfilePic.propTypes = {
  uid: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  placeholderSrc: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
  hideTooltip: PropTypes.bool
};
