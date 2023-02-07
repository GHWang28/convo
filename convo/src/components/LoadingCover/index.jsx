import { Box, CircularProgress } from '@mui/material';
import { animated, useTransition } from 'react-spring';
import PropTypes from 'prop-types';

export default function LoadingCover ({ display }) {
  const transitions = useTransition(display, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0, delay: 1000 },
  });
  const AnimatedBox = animated(Box);

  return transitions((style, display) => (
    (display) ? (
      <AnimatedBox
        style={style}
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          color: 'whitesmoke',
          bgcolor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999
        }}
      >
        <CircularProgress title='Loading' color='inherit' />
      </AnimatedBox>
    ) : null
  ))
}

LoadingCover.propTypes = {
  display: PropTypes.bool
}
