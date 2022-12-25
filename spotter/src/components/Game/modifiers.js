import { keyframes } from '@mui/system';

const zoomInOut = keyframes`
  0% {
    scale: 0;
  }
  45%, 55% {
    scale: 1.0;
  }
  100% {
    scale: 0;
  }
`;

export const zoomInOutAnimation = `${zoomInOut} ease-in-out 3.5s infinite`;
export const zoomInOutAnimationFast = `${zoomInOut} ease-in-out 2.5s infinite`;

const translateY = keyframes`
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

export const translateYAnimation = `${translateY} linear 4s infinite`

const translateX = keyframes`
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

export const translateXAnimation = `${translateX} linear 4s infinite`

const rotater = keyframes`
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
`;

export const rotaterAnimation = `${rotater} linear 2s infinite`;
export const rotaterAnimationFast = `${rotater} linear 1.2s infinite`;