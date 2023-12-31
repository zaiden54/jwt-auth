const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

// const generateTokens = (payload) => {
//   const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
//   const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
//   return {
//     accessToken,
//     refreshToken,
//   };
// };

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ where: { user: userId } });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({ user: userId, refreshToken });
  return token;
};

module.exports = { generateToken, saveToken };
