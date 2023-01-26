
import { styled, Switch } from '@mui/material';

export const SwitchChannelCreate = styled((props) => (
  <Switch  disableRipple {...props} />
))(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.publicColor,
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.privateColor,
    },
  },
  '& .MuiSwitch-thumb': {
    color: theme.palette.mode === 'light' ? 'black' : 'whitesmoke',
    border: theme.palette.mode === 'light' ? '1px solid whitesmoke' : '1px solid black'
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.privateColor,
    opacity: 1,
  },
}));