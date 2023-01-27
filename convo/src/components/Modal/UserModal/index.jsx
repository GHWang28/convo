import React, { useState, useEffect, Fragment } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setShowEditUserModal, setShowUserModal } from '../../../redux/actions';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '..';
import ProfilePic from '../../ProfilePic';
import { doc, onSnapshot } from 'firebase/firestore';
import { firebaseDatabase } from '../../../firebase';
import { convertEpochToDate } from '../../../helpers';
import LinkifyWrapper from '../../LinkifyWrapper';
import TagDisplay from '../../TagDisplay';

export default function UserModal () {
  const dispatch = useDispatch();
  const userUID = useSelector(state => state.userModal);
  const viewerUID = useSelector(state => state.loggedInUserData)?.uid;
  const [userData, setUserData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (!userUID) return;

    return onSnapshot(doc(firebaseDatabase, 'users', userUID), (doc) => {
      setUserData({ ...doc.data() });
    });
  }, [userUID]);

  const onClose = () => {
    dispatch(setShowUserModal(null));
  }
  const onExited = () => {
    setUserData(null);
  }
  const onEdit = () => {
    dispatch(setShowEditUserModal({
      uid: userData?.uid,
      displayName: userData?.handle,
      photoURL: userData?.profilePic
    }, true))
  }

  const imageSize = { height: '150px', width: '150px' };

  return (
    <Modal
      open={Boolean(userUID)}
      handleConfirm={(viewerUID === userData?.uid) ? onEdit : null}
      confirmIcon={<EditIcon />}
      confirmTitle='Edit'
      confirmColor='warning'
      handleClose={onClose}
      onExited={onExited}
      title={`${userData?.handle || '--'}`}
      subtitle={(userData?.creationTime?.seconds) ? `Joined on ${convertEpochToDate(userData?.creationTime?.seconds)}` : '--'}
      fullWidth
    >
      {(userData === null) ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{ color: 'contrastColor', mx: 'auto' }}/>
        </Box>
      ) : (
        <Fragment>
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
              <LinkifyWrapper>
                {`${userData?.bio}`}
              </LinkifyWrapper>
            </Typography>
          )}
          <TagDisplay label='User Tag' tag={userData?.tag} />
        </Fragment>
      )}
    </Modal>
  )
}
