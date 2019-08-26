'use strict';
/*
*	'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
*	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/**
 * Returns random counter value.
 * @param {Number} from min value
 * @param {Number} to max value
 * @param {Number} fixedFactor fixed factor
 */
function getRandomCounterValue(from = 10, to = 99, fixedFactor = 0) {
  const num = (Math.random() * (to - from) + from).toFixed(fixedFactor) * 1;
  return num;
}

/**
 * Server general purpose utilities module.
 */
module.exports = {
  getRandomCounterValue: getRandomCounterValue
};
