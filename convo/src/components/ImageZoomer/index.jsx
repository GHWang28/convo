import React, { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setImageZoom } from '../../redux/actions';
import { animated, useTransition } from 'react-spring';
import PropTypes from 'prop-types';

export default function ImageZoomer () {
  const dispatch = useDispatch();
  const src = useSelector(state => state.imgZoom);
  const transitions = useTransition(src, {
    from: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '-75%', opacity: 0 },
    enter: { backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)', y : '0%', opacity: 1 },
    leave: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '32.5%', opacity: 0  },
  });
  const AnimatedBox = animated(Box);
  
  const onClose = useCallback(() => { dispatch(setImageZoom(null)); }, [dispatch]);

  useEffect(() => {
    const windowKeyPress = (event) => {
      if (event.key === 'Escape') dispatch(setImageZoom(null));;
    }
    window.addEventListener('keydown', windowKeyPress);

    return () => {
      window.removeEventListener('keydown', windowKeyPress);
    };
  }, [dispatch]);

  useEffect(() => {
    if (src) {
      window.history.pushState('image-zoom', document.title, window.location.href);
      window.addEventListener('popstate', onClose);
    } else {
      window.removeEventListener('popstate', onClose);
      if (window.history.state === 'image-zoom') {
        window.history.back();
      }
    }
  }, [src, onClose]);

  return transitions((style, itemSrc) => (
    itemSrc ?
      <AnimatedBox
        id='img-zoom'
        style={{
          backgroundColor: style.backgroundColor,
          backdropFilter: style.backdropFilter
        }}
        sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh', 
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          pointerEvents: (!src) && 'none',
          zIndex: 1100,
        }}
        onClick={onClose}
      >
        <AnimatedBox
          component='img'
          alt='Zoomed in file'
          src={itemSrc}
          style={{
            y: style.y,
            opacity: style.opacity
          }}
          sx={{
            userSelect: 'none',
            maxHeight: '98%',
            maxWidth: '98%'
          }}
        />
      </AnimatedBox>
    : null
  ))
}

ImageZoomer.propTypes = {
  src: PropTypes.string,
  show: PropTypes.bool
};
