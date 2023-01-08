import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { setShowChannelCreateModal } from '../../redux/actions';

export default function ButtonCreateChannel () {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setShowChannelCreateModal(true));
  }

  return (
    <Button fullWidth variant='outlined' onClick={onClick} startIcon={<AddCircleOutlineIcon />}>
      {'Create Channel'}
    </Button>
  )
}