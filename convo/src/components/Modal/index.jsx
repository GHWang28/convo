import React, { forwardRef } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';

const Transition = forwardRef((props, ref) => (
  <Slide direction='down' ref={ref} {...props} />
));

export default function Modal ({
  open = false,
  confirmTitle = 'Confirm',
  confirmColor = 'primary',
  handleConfirm,
  handleClose,
  title,
  subtitle,
  children
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby='dialog-title'
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: '15px',
          border: '1px solid whitesmoke'
        }
      }}
      sx={{
        backdropFilter: 'blur(3px)'
      }}
    >
      <Typography id='dialog-title' variant='h4' align='center' mt={2}>{title}</Typography>
      <Box component='hr' sx={{ width: '90%' }} />
      <DialogContent>
        {(subtitle) && (
          <Typography>
            {subtitle}
          </Typography> 
        )}
        {children}
      </DialogContent>
      <DialogActions>
        {(handleConfirm) && (
          <Button onClick={handleConfirm} variant='contained' color={confirmColor}>
            {confirmTitle}
          </Button>
        )}
        <Button onClick={handleClose} variant='contained' color='secondary'>
          {'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}