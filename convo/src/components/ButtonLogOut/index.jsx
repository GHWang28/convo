import { Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { setShowLogOutModal } from '../../redux/actions';

export default function ButtonLogOut ({ small }) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setShowLogOutModal(true));
  }

  return (
    (small) ? (
      <IconButton onClick={onClick}>
        <LogoutIcon />
      </IconButton>
    ) : (
      <Button onClick={onClick} startIcon={<LogoutIcon />}>
        {'Log-out'}
      </Button>
    )
  )
}