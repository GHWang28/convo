import { keyframes } from '@mui/system';

export const zoomInOut = keyframes`
  0% {
    scale: 0;
  }
  30% {
    scale: 0;
  }
  45%, 55% {
    scale: 1.0;
  }
  70% {
    scale: 0;
  }
  100% {
    scale: 0;
  }
`;

export const translateY = keyframes`
  0% {
    translate: 0% 200%;
  }
  50% {
    translate: 0% -200%;
  }
  100% {
    translate: 0% 200%;
  }
`;

export const translateX = keyframes`
  0% {
    translate: 200% 0%;
  }
  50% {
    translate: -200% 0%;
  }
  100% {
    translate: 200% 0%;
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