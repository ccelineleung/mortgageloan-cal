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

// const sendAccessToken = (req, res, accesstoken, username) => {
//   console.log(`hiiiiii`);
//   res.send({
//     username: username,
//     accesstoken,
//     status: true,
//     message: 'Successful logged in',
//   });
// };

const sendRefreshToken = (res, refreshtoken) => {
  // console.log(`sendRefreshToken`, refreshtoken);
  res.cookie('refreshtoken', refreshtoken, {
    httpOnly: true,
    // path: '/protected',
  });
  // res.cookie('refreshtoken', refreshtoken);
};

module.exports = {
  createAccressToken,
  createRefreshToken,
  // sendAccessToken,
  sendRefreshToken,
};
