import { keyframes } from '@mui/system';

const zoomInOut = keyframes`
  0% {
    scale: 0.1;
  }
  45%, 55% {
    scale: 1.0;
  }
  100% {
    scale: 0.1;
  }
`;

export const zoomInOutAnimation = `${zoomInOut} ease-in-out 2.5s infinite`;
export const zoomInOutAnimationFast = `${zoomInOut} ease-in-out 1.5s infinite`;

const translateY = keyframes`
  0% {
    transform: translateY(100px);
  }
  50% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(100px);
  }
`;

export const translateYAnimation = `${translateY} ease-in-out 2.5s infinite`

const translateX = keyframes`
  0% {
    transform: translateX(100px);
  }
  50% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(100px);
  }
`;

export const translateXAnimation = `${translateX} ease-in-out 2.5s infinite`

const rotater = keyframes`
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
`;

export const rotaterAnimation = `${rotater} linear 3s infinite`;
export const rotaterAnimationFast = `${rotater} linear 2s infinite`;
