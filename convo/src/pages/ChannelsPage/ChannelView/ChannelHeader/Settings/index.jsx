import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ButtonMenu from '../../../../../components/ButtonMenu';

export default function Settings () {

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