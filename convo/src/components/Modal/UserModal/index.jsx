import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setShowUserModal } from '../../../redux/actions';
import { getUser } from '../../../firebase/database';
import Modal from '..';
import ProfilePic from '../../ProfilePic';

export default function UserModal () {
  const dispatch = useDispatch();
  const userUID = useSelector(state => state.userModal);
  const [userData, setUserData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (!userUID) return;
    getUser(userUID, true)
      .then((data) => {
        setUserData({ ...data });
      })
  }, [userUID]);

  const onClose = () => {
    dispatch(setShowUserModal(null));
  }

  const imageSize = { height: '150px', width: '150px' };

  return (
    <Modal
      open={Boolean(userData) && Boolean(userUID)}
      handleClose={onClose}
      title={`${userData?.handle}`}
      subtitle='Profile'
      fullWidth
    >
      <Box mb={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <ProfilePic
          alt={userData?.handle || 'You'}
          src={userData?.profilePic}
          sx={{ ...imageSize, bgcolor: 'mainColorNormal' }}
        />
      </Box>
      {(Boolean(userData?.bio)) && (
        <Typography
          p={2}
          align='center'
          fontSize={20}
          sx={{
            bgcolor: 'mainColorDark',
            boxSizing: 'border-box',
            borderRadius: '15px',
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='${theme.palette.contrastColor}' opacity='0.25' viewBox='0 0 16 16'%3E%3Cpath d='M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z'/%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='${theme.palette.contrastColor}' opacity='0.25' transform='rotate(180)' viewBox='0 0 16 16'%3E%3Cpath d='M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z'/%3E%3C/svg%3E")
            `,
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: ' left top, right bottom'
          }}
        >
          {`${userData?.bio}`}
        </Typography>
      )}
    </Modal>
  )
}