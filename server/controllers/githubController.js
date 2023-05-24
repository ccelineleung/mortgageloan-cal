const db = require('../models/dbModels');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


const gitubController = {};

const CLIENT_ID = '9cd0743fffb166dd3058';
const CLIENT_SECRET = '9c5e14ff4a28c13306853edd1387169c73045c3e';

// gitubController.getAccessToken = async (req, res, next) => {
//   // it wont run if the code is not exist
//   req.query.code;

//   const params =
//     '?client_id=' +
//     CLIENT_ID +
//     '&client_secret=' +
//     CLIENT_SECRET +
//     '&code=' +
//     req.query.code;

//   await fetch('https://github.com/login/oauth/access_token' + params, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       res.json(data);
//     });
//     return next()
// };

gitubController.getAccessToken = async (req, res, next) => {
  // it wont run if the code is not exist
//   req.query.code;
  console.log(`req.query.code`, req.query.code);
  console.log(`hii`);
  const params =
    '?client_id=' +
    CLIENT_ID +
    '&client_secret=' +
    CLIENT_SECRET +
    '&code=' +
    req.query.code;
  console.log(`this is params`, params);
  try {
    const result = await fetch(
      'https://github.com/login/oauth/access_token' + params,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const data = await result.json();
    console.log(`data from getAccessToken`, data);
    res.locals.status = data;
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

//getUserData
// access token is going to be passed in as an Authorization header

// gitubController.getUserData = async (req, res, next) => {
//   let data;
//   req.get('Authorization'); // Bearer ACCESSTOKEN
//   await fetch('https://api.github.com/user', {
//     method: 'GET',
//     headers: {
//       Authorization: req.get('Authorization'),
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((datas) => {
//       console.log(data);
//       //   res.json(data);
//       data = datas;
//     });
//   return next();
// };

//access token is going to be passed in as an authorization header
gitubController.getUserData = async (req, res, next) => {
  req.get('Authorization'); // Bearer ACCESSTOKEN
  console.log(`hi`);
  try {
    const result = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: req.get('Authorization'),
      },
    });
    const data = await result.json();
    res.locals.status = data;
    console.log(data);
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = gitubController;
