import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { setShowLogOutModal } from '../../redux/actions';
import { postNewChannel } from '../../Firebase/database';
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ButtonCreateChannel () {
  const dispatch = useDispatch();
  const [ user ] = useAuthState(auth);
  const onClick = () => {
    if (!user) return;
    postNewChannel('name', 'nasd', true, user?.uid);
  }

  return (
    <Button fullWidth variant='outlined' onClick={onClick} startIcon={<AddCircleOutlineIcon />}>
      {'Create Channel'}
    </Button>
  )
}