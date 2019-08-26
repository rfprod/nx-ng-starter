'use strict';
/*
*	'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
*	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
*	external modules defined in package.json in the project root
*/
const jwt = require('jwt-simple');
const crypto = require('crypto');

/**
 * Generates JWT token
 * @param {*} payload token payload
 */
function generateJWToken(payload) {
  const salt = crypto.randomBytes(24).toString('hex');
  const token = jwt.encode(payload, salt, 'HS256'); // HS256, HS384, HS512, RS256.
  return { token: token, salt: salt };
}

/**
 * Decrypts JWT token.
 * @param {*} token user token
 * @param {*} storedSalt stored salt
 */
function decryptJWToken(token, storedSalt) {
  if (!token || !storedSalt) return false;
  return jwt.decode(token, storedSalt, 'HS256'); // HS256, HS384, HS512, RS256.
}

/**
 * Returns token object with payload
 * @param {String} email user email
 * @param {String} name user name
 * @param {String} organization user organization
 */
function getTokenWithPayload(email, name, organization) {
  let expires = new Date();
  expires.setDate(expires.getDate() + 7); // expires in one week unless revoked
  const payload = { email, name, organization, expires };
  return generateJWToken(payload);
}

/**
 * Server JWT utilities method.
 */
module.exports = {
  generateJWToken: generateJWToken,
  decryptJWToken: decryptJWToken,
  getTokenWithPayload: getTokenWithPayload
};
