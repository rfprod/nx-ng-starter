'use strict';

/**
 * JWT methods
 */
const jwtMethods = require('../helpers/jwt-methods.js');

/**
 * Returns token object with payload
 * @param {String} email user email
 * @param {String} name user name
 * @param {String} organization user organization
 */
const getTokenWithPayload = jwtMethods.getTokenWithPayload;

/**
 * Server http handlers module.
 * For usage in express server and in cloud functions.
 */
module.exports = {

  /**
   * Handles user login.
   */
  login: (req, res) => {
    const email = req.body.email || '';
    const firstName = 'first name';
    const lastName = 'last name'
    const companyName = 'company name';
    const password = req.body.password || '';
    const role = (/carrier/.test(email)) ? 'CARRIER' : 'CARGO_OWNER';
    if (email && password) {
      const tokenObject = getTokenWithPayload({email, firstName, lastName, companyName, role});
      res.status(200).json({
        email,
        firstName,
        lastName,
        companyName,
        role,
        token: tokenObject.token
      });
    } else {
      let missingParams = email ? '' : 'email';
      missingParams += password ? '' : ', password';
      res.status(400).json({ error: `Missing mandatory request parameters: ${missingParams}` });
    }
  },

  /**
   * Handles user logout.
   */
  logout: (req, res) => {
    if (!req.headers.authorization) {
      res.status(400).json({ errors: [{ code: 'auth_token', detail: 'Missing authorization header' }]});
    } else {
      res.status(200).json({});
    }
  },

  /**
   * Handles user signup.
   */
  signup: (req, res) => {
    const email = req.body.email || '';
    const firstName = req.body.firstName || '';
    const lastName = req.body.lastName || '';
    const companyName = req.body.companyName || '';
    const role = req.body.role || '';
    const password = req.body.password || '';
    if (name === 'exists') {
      res.status(409).json({ error: `User exists` });
    } else if (email && firstName && lastName && companyName && password) {
      const tokenObject = getTokenWithPayload(email, name, organization);
      res.status(200).json({
        email,
        fistName,
        lastName,
        companyName,
        role,
        token: tokenObject.token
      });
    } else {
      let missingParams = email ? '' : 'email';
      missingParams += firstName ? '' : ', firstName';
      missingParams += lastName ? '' : ', lastName';
      missingParams += companyName ? '' : ', companyName';
      missingParams += password ? '' : ', password';
      res.status(400).json({ error: `Missing mandatory request parameters: ${missingParams}` });
    }
  }

};
