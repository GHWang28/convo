import React, { forwardRef } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Transition = forwardRef((props, ref) => (
  <Slide direction='down' ref={ref} {...props} />
));

export default function Modal ({
  open = false,
  confirmTitle = 'Confirm',
  closeTitle = 'Close',
  confirmColor = 'primary',
  closeColor = 'secondary',
  handleConfirm,
  handleClose,
  title,
  subtitle,
  fullWidth = false,
  fullScreen = false,
  children
}) {
  const fetching = useSelector(state => state.fetching);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      aria-labelledby='dialog-title'
      PaperProps={{ sx: [{ p: 2 }, (!fullScreen) && { borderRadius: '15px', border: '1px solid whitesmoke' }] }}
      sx={{
        backdropFilter: 'blur(3px)',
      }}
    >
      <Typography id='dialog-title' variant='h4' align='center' mt={2}>{title}</Typography>
      {(subtitle) && (
        <Typography variant='subtitle1' align='center'>
          {subtitle}
        </Typography> 
      )}
      <Box component='hr' sx={{ width: '90%' }} />
      <DialogContent sx={[{ overflowY: 'auto' }, (fullScreen) && { display: 'flex', flexDirection: 'column' }]}>
        <Box sx={{ my: 'auto' }} >
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        {(handleConfirm) && (
          <Button onClick={handleConfirm} variant='contained' color={confirmColor}>
            {confirmTitle}
          </Button>
        )}
        {(handleClose) && (
          <Button onClick={handleClose} variant='contained' color={closeColor}>
            {closeTitle}
          </Button>
        )}
        {(fetching) && (
          <CircularProgress
            title='Loading'
            sx={{ position: 'absolute', left: 20 }}
          />
        )}
      </DialogActions>
    </Dialog>
  )
}