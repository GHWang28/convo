import { keyframes } from '@mui/system';

export const zoomInOut = keyframes`
  0% {
    scale: 0;
  }
  25%, 75% {
    scale: 1.0;
  }
  100% {
    scale: 0;
  }
`;

export const translateY = keyframes`
  0% {
    translate: 0% 100%;
  }
  50% {
    translate: 0% -100%;
  }
  100% {
    translate: 0% 100%;
  }
`;

export const translateX = keyframes`
  0% {
    translate: 100% 0%;
  }
  50% {
    translate: -100% 0%;
  }
  100% {
    translate: 100% 0%;
  }
`;

export const rotater = keyframes`
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
`;