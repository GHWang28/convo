import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import ButtonMenu from '../../../../../components/ButtonMenu';
import { useDispatch } from 'react-redux';
import { setShowChannelEditModal } from '../../../../../redux/actions';

export default function Settings ({ channelData }) {
  const dispatch = useDispatch();

  const options = [
    {
      text: 'View Channel Members',
      icon: <PeopleAltIcon />
    },
    {
      text: 'Invite',
      icon: <PersonAddIcon />
    },
    {
      text: 'Edit Channel',
      icon: <EditIcon />,
      onClick: () => {
        dispatch(setShowChannelEditModal(channelData))
      }
    },
    {
      text: 'Leave Channel',
      icon: <DoorBackIcon />
    }
  ]

  return (
    <ButtonMenu
      id='settings'
      icon={<SettingsIcon/>}
      menuItems={options}
    />
  )
}