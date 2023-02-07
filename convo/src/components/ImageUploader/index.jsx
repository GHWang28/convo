import React, { Fragment } from 'react';
import ReactImageUploading from 'react-images-uploading';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfilePic from '../ProfilePic';
import { toast } from 'react-toastify';
import { Badge, badgeClasses, Box, Button, Collapse, IconButton, Typography, useTheme } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { compressImage } from '../../helpers';
import PropTypes from 'prop-types';

export default function ImageUploader ({ imageArray, setImageArray, alt, placeholderSrc }) {
  const theme = useTheme();
  const imageSize = { height: '150px', width: '150px' };
  const onImageChange = (newImage) => {
    (newImage.at(0)?.dataURL) ? compressImage(newImage.at(0)?.file, setImageArray) : setImageArray(newImage);
  }

  return (
    <Box mb={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <ReactImageUploading
        value={imageArray}
        onChange={onImageChange}
        onError={(errors) => {
          if (errors.acceptType) {
            toast.error('File type not accepted. Must be jpg, jpeg, webp, svg or png.');
          } else {
            toast.error('Failed to upload image.');
          }
        }}
        acceptType={['jpg', 'png', 'jpeg', 'webp', 'svg']}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <Fragment>
            {(isDragging) && (
              <Box
                sx={{
                  ...imageSize,
                  position: 'absolute',
                  top: 0,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2
                }}
              >
                <Typography align='center' fontWeight='bold'>
                  {'Drop image here to upload'}
                </Typography>
              </Box>
            )}
            <Badge
              color='secondary'
              overlap='circular'
              badgeContent={
                <BootstrapTooltip title='Upload New Picture' placement='top'>
                  <IconButton
                    sx={{
                      scale: (isDragging) ? 0 : 1,
                      transition: 'scale 0.3s ease-in-out',
                      color: 'mainColorNormal',
                      border: `5px solid ${theme.palette.mainColorLight}`,
                      bgcolor: 'rgb(255,255,255)',
                      "&:hover, &.Mui-focusVisible": {
                        bgcolor: 'rgb(230,230,230)'
                      }
                    }}
                    onClick={onImageUpload}
                  >
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </BootstrapTooltip>
              }
              sx={{ [`& .${badgeClasses.badge}`]: {
                width: '0px',
                height: '0px',
              } }}
            >
              <ProfilePic
                {...dragProps}
                alt={alt}
                src={imageList?.at(0)?.dataURL}
                placeholderSrc={placeholderSrc}
                sx={{ ...imageSize, bgcolor: 'mainColorNormal' }}
              />
            </Badge>
            <Collapse in={Boolean(imageList?.at(0)?.dataURL)} sx={{ m: 1 }}>
              <Button startIcon={<DeleteIcon />} onClick={() => { onImageRemove(0) }} variant='contained' color='error' size='small'>
                {'Delete Picture'}
              </Button>
            </Collapse>
          </Fragment>
        )}
      </ReactImageUploading>
      <Typography align='center' color='secondary' fontSize={14}>
        {'[To change picture: Click icon or drag/drop new image onto existing picture]'}
      </Typography>
    </Box>
  )
}

ImageUploader.propTypes = {
  imageArray: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.string
  ]).isRequired,
  setImageArray: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string
}
