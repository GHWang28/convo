import cryptoJs from 'crypto-js';
import config from '../config.json';

/**
 * Generates a random integer between min and max inclusively
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
export function rng(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

/**
 * Finds the mouse position on the canvas
 * @param {HTMLElement} canvas 
 * @param {Event} event 
 * @returns {Object}
 */
export function getMousePos (canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

/**
 * Encrypts a message
 * @param {string} message 
 * @returns {string}
 */
export function encrypt (message) {
  return cryptoJs.AES.encrypt(message, config.PRIVATE_KEY);
}

/**
 * Decrypts a message
 * @param {string} message 
 * @returns {string}
 */
export function decrypt (message) {
  if (!message) return null;
  const bytes = cryptoJs.AES.decrypt(message.toString(), config.PRIVATE_KEY);
  return bytes.toString(cryptoJs.enc.Utf8);
}
