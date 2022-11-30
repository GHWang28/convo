/* eslint-disable no-self-assign */
import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { getMousePos } from '../../helpers';
import PropTypes from 'prop-types';

function Spotlight ({ radius }) {

  useEffect(() => {
    const mouseMove = (event) => {

      const canvas = document.getElementById('spotlight');
      if (!canvas) return;
      const context = canvas.getContext('2d');
      const mousePos = getMousePos(canvas, event);

      canvas.width = canvas.width;
      if (radius > 0) {
        context.beginPath();
        context.rect(0,0,canvas.width,canvas.height);
        context.arc(mousePos.x, mousePos.y, radius, 0, Math.PI * 2, true)
        context.clip();
        context.fillRect(0,0,canvas.width,canvas.height);
      }
    };
    window.addEventListener('mousemove', mouseMove);
    window.dispatchEvent(new Event('mousemove'));

    return () => { window.removeEventListener('mousemove', mouseMove) };
  }, [radius]);

  return (
    <Box
      id='spotlight'
      component='canvas'
      height='100vh'
      sx={{
        zIndex: 100,
        left: 0,
        top: 0,
        position: 'absolute',
        pointerEvents: 'none'
      }}
    />
  )
}

Spotlight.propTypes = {
  radius: PropTypes.number.isRequired, 
};

export default Spotlight;
