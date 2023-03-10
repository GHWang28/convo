import React from 'react';
import ButtonMenu from '../ButtonMenu';
import GifPicker from 'gif-picker-react';
import GifIcon from '@mui/icons-material/Gif';
import PropTypes from 'prop-types';

export default function ButtonGifPicker ({ onGifClick }) {
  return (
    <ButtonMenu
      icon={<GifIcon sx={{ scale: '1.6' }}/>}
      title='Add Reaction'
      id='gif-picker-btn'
      size='small'
      sx={{
        bgcolor: 'mainColorSlightLight',
        "&:hover, &.Mui-focusVisible": {
          bgcolor: 'mainColorLight'
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      {({ onClose }) => (
        <GifPicker
          theme='dark'
          autoFocusSearch={false}
          tenorApiKey='AIzaSyA1416HVoCuhmF86AeK6nI2fAS3V8lD0Z0'
          onGifClick={(tenorImageObj) => {
            onGifClick(tenorImageObj);
            onClose();
          }}
        />
      )}
    </ButtonMenu>
  )
}

ButtonGifPicker.propTypes = {
  onGifClick: PropTypes.func.isRequired
}
