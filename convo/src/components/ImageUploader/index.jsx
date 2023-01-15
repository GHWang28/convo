import React from 'react';
import { Box, IconButton, keyframes } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ReactImageUploading from 'react-images-uploading';
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import BootstrapTooltip from '../BootstrapTooltip';

const shakingKeyframes = keyframes`
  0% {
    rotate: -20deg
  }
  50% {
    rotate: 20deg
  }
  100% {
    rotate: -20deg
  }
`

export default function ImageUploader ({ image, onChange }) {

  return (
    <ReactImageUploading
      value={image}
      onChange={onChange}
      onError={(errors) => {
        if (errors.acceptType) {
          toast.error('File type not accepted. Must be jpg, png or gif.')
        }
      }}
      acceptType={['jpg', 'gif', 'png']}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <Fragment>
          <BootstrapTooltip title='Send Image'>
            <IconButton
              {...dragProps}
              color='secondary'
              onClick={onImageUpload}
              sx={{
                borderWidth: '1px',
                borderRadius: 0,
                borderStyle: 'solid',
                borderColor: 'secondary',
                height: '42px',
                width: '42px',
              }}
            >
              <AddPhotoAlternateIcon
                sx={{ pointerEvents: 'none', animation: (isDragging) ? `${shakingKeyframes} 1.0s ease-in-out infinite` : null, animationDelay: '-0.5s' }} />
            </IconButton>
          </BootstrapTooltip>
          {(imageList.length !== 0) && imageList.map((imageItem, index) => (
            <IconButton key={`uploaded-img-${index}`} onClick={() => { onImageRemove(index) }} sx={{ borderRadius: 0, height: '42px', width: '42px' }}>
              <Box
                alt={`uploaded-img-${index}`}
                component='img'
                src={imageItem.dataURL} 
                sx={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </IconButton>
          ))}
        </Fragment>
      )}
      
    </ReactImageUploading>
  )
}