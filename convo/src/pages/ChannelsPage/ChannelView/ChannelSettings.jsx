import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import ButtonMenu from '../../../components/ButtonMenu';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setShowChannelEditModal, setShowChannelInviteModal, setShowChannelLeaveModal, setShowChannelMemberModal, setShowChannelNotifications } from '../../../redux/actions';
import PropTypes from 'prop-types';

export default function ChannelSettings ({ channelData }) {
  const dispatch = useDispatch();
  const channelNotificationToggle = useSelector(state => state.channelNotification);

  const options = [
    {
      text: (channelNotificationToggle) ? 'Hide Announcements' : 'Show Announcements',
      icon: (channelNotificationToggle) ? <CancelOutlinedIcon /> : <AnnouncementIcon />,
      onClick: () => {
        dispatch(setShowChannelNotifications(!channelNotificationToggle))
      }
    },
    {
      text: 'View Channel Members',
      icon: <PeopleAltIcon />,
      onClick: () => {
        dispatch(setShowChannelMemberModal(Object.keys(channelData?.cidToUid)));
      }
    },
    (!channelData?.publicMode) && {
      text: 'Invite',
      icon: <PersonAddIcon />,
      onClick: () => {
        dispatch(setShowChannelInviteModal(Object.keys(channelData?.cidToUid)));
      }
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
      icon: <DoorBackIcon />,
      onClick: () => {
        dispatch(setShowChannelLeaveModal(channelData))
      }
    }
  ]

  return (
    <ButtonMenu
      id='settings'
      title='Channel Settings'
      icon={<SettingsIcon/>}
      menuItems={options.filter((option) => (option))}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    />
  )
}

ChannelSettings.propTypes = {
  channelData: PropTypes.object.isRequired,
}
