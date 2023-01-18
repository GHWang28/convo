import React from 'react';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '..';
import config from '../../../config.json';
import { rng } from '../../../helpers';

export default function MOTDModal () {
  const userData = useSelector(state => state.loggedInUserData);
  const [show, setShow] = useState(sessionStorage.getItem('uniqueSess') === null);
  const [generatedMsg, setGeneratedMsg] = useState('');

  useEffect(() => {
    setGeneratedMsg(generateMOTD());
  }, [])
  
  return (
    <Modal
      open={Boolean(userData) && show}
      handleClose={() => { setShow(false); sessionStorage.setItem('uniqueSess', false); }}
      title={`${generateGreetings()}, ${userData?.handler}!`}
      subtitle={'Did you know?'}
      confirmColor='error'
      fullWidth
    >
      <Typography fontSize={20} align='center'>
        {generatedMsg}
      </Typography>
    </Modal>
  )
}

/**
 * Generates a greeting based on the time
 * @return {String} an appropriate greeting
 */
function generateGreetings() {
  const hour = new Date().getHours();
  // 5am -> 12pm = Morning
  // 12pm -> 5pm = Afternoon
  // 5pm -> 9pm = Evening
  // 9pm -> 5am = Night
  switch (hour) {
  case 5:
  case 6:
  case 7:
  case 8:
  case 9:
  case 10:
  case 11:
      return `Good Morning`;
  case 12:
  case 13:
  case 14:
  case 15:
  case 16:
      return `Good Afternoon`;
  case 17:
  case 18:
  case 19:
  case 20:
  case 21:
      return `Good Evening`;
  default:
      return `It's late`;
  }
}

/**
 * Generates a random message out of a preset
 * @return {string}
 */
function generateMOTD () {
  const msgIndex = rng(0, config.MOTD.length);

  if (msgIndex === config.MOTD.length) {
  // If rng is out of bounds, then send a special message about the day
      return `Today is ${config.DAY_NAMES[new Date().getDay()]}. Seize the day!`;
  } else {
      return config.MOTD[msgIndex];
  }
}
