import { Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { setShowLogOutModal } from '../../redux/actions';
import BootstrapTooltip from '../BootstrapTooltip';
import PropTypes from 'prop-types';

export default function ButtonLogOut ({ small }) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setShowLogOutModal(true));
  }

  return (
    <BootstrapTooltip title='Log Out'>
      {(small) ? (
        <IconButton
          onClick={onClick} 
          sx={{ '&:hover': { color: 'error.main' }}}
        >
          <LogoutIcon
            sx={{ transition: 'color 0.5s ease-in-out' }}
          />
        </IconButton>
      ) : (
        <Button onClick={onClick} startIcon={<LogoutIcon />}>
          {'Log Out'}
        </Button>
      )}
    </BootstrapTooltip>
  )
}

ButtonLogOut.propTypes = {
  small: PropTypes.bool
}
