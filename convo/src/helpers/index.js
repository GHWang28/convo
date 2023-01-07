
/**
 * Generates a random integer between min and max inclusively
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
export function rng(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}
