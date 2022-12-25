import getCharacterTypes from '../CharacterCoin/getTypes';
import { v4 as uuidv4 } from 'uuid';
import * as mod from './modifiers';
import { rng } from '../../helpers';

/**
 * Generates a level object based on the provided level
 * @param {Number} level 
 * @returns {Object}
 */
export function generateLevel (level) {
  const ghostMode = (rng(0, 4) === 0 && level >= 15);
  const noModifiers = (rng(0, 6) === 0);

  const totalChars = ((level === 0) ? 0 : Math.min(
    Math.max(Math.floor(level) * 2, 5),
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
      case 1: return mod.translateXAnimation;
      case 2: return mod.translateYAnimation;
      case 3: return mod.zoomInOutAnimation;
      case 4: return mod.rotaterAnimation;
      default: return '';
    }
  }

  const generateModifiers = () => {
    const modifiers = [];
    const filters = [];
    switch (Math.floor(level / 4)) {
      case 0:
        break;
      case 1:
        if (rng(0, 10) === 0) modifiers.push(...[
          mod.rotaterAnimation
        ]);
        break;
      case 2:
        // Rotating
        modifiers.push(...[
          mod.rotaterAnimationFast
        ]);
        break;
      case 3:
        // Move left and right
        modifiers.push(...[
          mod.translateXAnimation
        ]);
        break;
      case 4:
        // Move up and down
        modifiers.push(...[
          mod.translateYAnimation
        ]);
        break;
      case 5:
        // Zooming in and out quicker
        modifiers.push(...[
          mod.zoomInOutAnimationFast
        ]);
        break;
      case 6:
        // Zooming in and out quicker
        modifiers.push(...[
          mod.zoomInOutAnimationFast,
          mod.rotaterAnimationFast
        ]);
        break;
      case 7:
        // Rotater and move left and right
        modifiers.push(...[
          mod.translateXAnimation,
          mod.rotaterAnimation
        ]);
        break;
      case 8:
        // Rotater and move up and down
        modifiers.push(...[
          mod.translateYAnimation,
          mod.rotaterAnimation
        ]);
        break;
      case 9:
        // Rotater and zoom in and out and move up and down
        modifiers.push(...[
          mod.translateYAnimation,
          mod.rotaterAnimation,
          mod.zoomInOutAnimation
        ]);
        break;
      case 10:
        // Rotater and zoom in and out and translate left to right
        modifiers.push(...[
          mod.translateXAnimation,
          mod.rotaterAnimation,
          mod.zoomInOutAnimation
        ]);
        break;
      case 11:
        // Rotater and zoom in and out and translate up to down fast
        modifiers.push(...[
          mod.translateYAnimation,
          mod.rotaterAnimationFast,
          mod.zoomInOutAnimationFast
        ]);
        break;
      case 12:
        // Rotater and zoom in and out and translate diagonal
        modifiers.push(...[
          mod.zoomInOutAnimation,
          mod.rotaterAnimation,
          mod.translateYAnimation,
          mod.translateYAnimation
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
    top: `${rng(50, 450) / 5}%`,
    left: `${rng(50, 450) / 5}%`,
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
      zIndex: 6
    },
    otherCharacterData,
    spotlightRadius: (ghostMode) ? rng(20, 40) : 0,
    distraction: (level > 15 && rng(0, 5) === 0)
  }
}