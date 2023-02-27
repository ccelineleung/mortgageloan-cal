const { sign } = require('jsonwebtoken');

const createAccressToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const sendAccessToken = (req, res, accesstoken) => {
  res.send({
    accesstoken,
    email: req.body.email,
    status: true,
    message: 'Successful logged in',
  });
};

const sendRefreshToken = (res, refreshtoken) => {
  res.cookie('refreshtoken', refreshtoken, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

module.exports = {
  createAccressToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
