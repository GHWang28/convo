import getCharacterTypes from '../components/CharacterCoin/getTypes';
import { rng } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import * as mod from './modifiers';

/**
 * Generates a level object based on the provided level
 * @param {Number} level 
 * @returns {Object}
 */
export function generateLevel (level) {
  const ghostMode = (rng(0, 4) === 0 && level >= 15);
  const noModifiers = (rng(0, 6) === 0);

  const totalChars = ((level === 0) ? 0 : Math.min(
    Math.max(Math.floor(level), 3),
    150
  )) + ((level >= 15 && noModifiers) ? rng(50, 60) : 0);

  const characterToSpotID = rng(0, getCharacterTypes().length - 1);

  const generateRandomID = () => {
    let returnID = rng(0, getCharacterTypes().length - 1);
    while (returnID === characterToSpotID) {
      returnID = rng(0, getCharacterTypes().length - 1);
    }
    return returnID;
  }

  const generateRandomModifier = () => {
    switch (rng(0, 4)) {
      case 1: return `${mod.translateX} linear 4s infinite`;
      case 2: return `${mod.translateY} linear 4s infinite`;
      case 3: return `${mod.zoomInOut} ease-in-out 3s infinite`;
      case 4: return `${mod.rotater} linear 2s infinite`;
      default: return '';
    }
  }

  const generateModifiers = () => {
    const modifiers = [];
    const filters = [];
    switch (Math.floor(level / 3)) {
      case 0:
        break;
      case 1:
        if (rng(0, 10) === 0) modifiers.push(...[
          `${mod.rotater} linear 2s infinite`
        ]);
        break;
      case 2:
        // Rotating
        modifiers.push(...[
          `${mod.rotater} linear 2s infinite`
        ]);
        break;
      case 3:
        // Move left and right
        modifiers.push(...[
          `${mod.translateX} linear 6s infinite`
        ]);
        break;
      case 4:
        // Move up and down
        modifiers.push(...[
          `${mod.translateY} linear 6s infinite`
        ]);
        break;
      case 5:
        // Zooming in and out quicker
        modifiers.push(...[
          `${mod.zoomInOut} ease-in-out 3.0s infinite`
        ]);
        break;
      case 6:
        // Zooming in and out quicker
        modifiers.push(...[
          `${mod.zoomInOut} ease-in-out 1.5s infinite`
        ]);
        break;
      case 7:
        // Rotater and move left and right
        modifiers.push(...[
          `${mod.translateX} linear 5s infinite`,
          `${mod.rotater} linear 2s infinite`
        ]);
        break;
      case 8:
        // Rotater and move up and down
        modifiers.push(...[
          `${mod.translateY} linear 5s infinite`,
          `${mod.rotater} linear 2s infinite`
        ]);
        break;
      case 9:
        // Rotater and zoom in and out
        modifiers.push(...[
          `${mod.zoomInOut} linear 3s infinite`,
          `${mod.rotater} linear 2s infinite`
        ]);
        break;
      case 10:
        // Rotater and zoom in and out and translate left to right
        modifiers.push(...[
          `${mod.zoomInOut} ease-in-out 3s infinite`,
          `${mod.rotater} linear 2s infinite`,
          `${mod.translateX} linear 4s infinite`,
        ]);
        break;
      case 11:
        // Rotater and zoom in and out and translate up to down
        modifiers.push(...[
          `${mod.zoomInOut} ease-in-out 3s infinite`,
          `${mod.rotater} linear 2s infinite`,
          `${mod.translateY} linear 4s infinite`,
        ]);
        break;
      case 12:
        // Rotater and zoom in and out and translate diagonal
        modifiers.push(...[
          `${mod.zoomInOut} ease-in-out 3s infinite`,
          `${mod.rotater} linear 2s infinite`,
          `${mod.translateY} linear 4s infinite`,
          `${mod.translateX} linear 4s infinite`,
        ]);
        break;
      case 13:
        // grayscale
        filters.push('grayscale(100%)')
        break;
      case 14:
        // invert
        filters.push('invert(100%)')
        break;
      case 15:
        // blur
        filters.push('blur(3px)')
        break;
      case 16:
        // shape
        filters.push('invert(50%)')
        break;
      case 17:
        // Invert and grayscale
        filters.push('blur(3px)', 'grayscale(100%)')
        break;
      case 18:
      case 19:
        // Randomiser of modifiers
        modifiers.push(...[
          generateRandomModifier()
        ]);
        break;
      case 20:
      case 21:
        // Randomiser of modifiers and filters
        modifiers.push(...[
          generateRandomModifier()
        ]);
        filters.push((rng(0, 1)) ? 'grayscale(100%)' : 'blur(3px)')
        break;  
      default:
        modifiers.push(...[
          generateRandomModifier(),
          generateRandomModifier(),
        ]);
        filters.push(
          (rng(0, 1))
            ? ((rng(0, 1))
              ? 'grayscale(100%)'
              : ''
              )
            : ((rng(0, 1))
              ? 'invert(100%)'
              : 'invert(50%)'
              )
        )
        filters.push((rng(0, 1)) ? 'blur(3px)' : '')
    }

    return {
      animation: modifiers.join(', '),
      filter: filters.join(' ')
    }
  }

  const otherCharacterData = [...Array(Math.max(totalChars))].map(() => ({
    id: uuidv4(),
    cid: generateRandomID(),
    top: `${rng(0, 200) / 2}%`,
    left: `${rng(0, 200) / 2}%`,
    modifiers: (noModifiers) ? {} : generateModifiers(),
    zIndex: rng(0,5)
  }));

  return {
    level,
    characterToSpotData: {
      id: uuidv4(),
      cid: characterToSpotID,
      top: `${rng(10, 90)}%`,
      left: `${rng(10, 90)}%`,
      modifiers: (noModifiers) ? {} : generateModifiers(),
      zIndex: rng(0,5)
    },
    otherCharacterData,
    spotlightRadius: (ghostMode) ? rng(20, 40) : 0,
    distraction: (level > 15 && rng(0, 5) === 0)
  }
}