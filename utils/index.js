const checkPermissions = require('./checkPermissions');
const createHash = require('./createHash');
const createTokenUser = require('./createTokenUser');
const { attachCookiesToResponse, createJWT, isTokenValid } = require('./jwt');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  createHash,
};
