'use strict';

/**
 * mailchimp.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const axios = require('axios');
const crypto = require('crypto');
const { api } = require('../config/api');

module.exports = {
  getConfig: () => {
    return api;
  },
  client: () => {
    return axios.create({
      baseURL: `https://${api.dc}.api.mailchimp.com/3.0`,
      auth: {
        username: 'fdp-berlin',
        password: api.key,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  getUserHash: (email) => {
    return crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex')
  },
};
