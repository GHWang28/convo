import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { setShowChannelCreateModal } from '../../redux/actions';
import BootstrapTooltip from '../BootstrapTooltip';

export default function ButtonCreateChannel () {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setShowChannelCreateModal(true));
  }

  return (
    <BootstrapTooltip title='Create a brand new channel' placement='right'>
      <Button fullWidth variant='contained' onClick={onClick} startIcon={<AddCircleOutlineIcon />}>
        {'Create Channel'}
      </Button>
    </BootstrapTooltip>
  )
}