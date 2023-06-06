const db = require('../models/dbModels');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const dotenv = require('dotenv');
dotenv.config();
const gitubController = {};

// const CLIENT_ID = '9cd0743fffb166dd3058';
// const CLIENT_SECRET = '9c5e14ff4a28c13306853edd1387169c73045c3e';

const CLIENT_ID = process.env.OAUTH_GITHUB_ID;
const CLIENT_SECRET = process.env.OAUTH_GITHUB_SECRET;

gitubController.getAccessToken = async (req, res, next) => {
  // it wont run if the code is not exist
  //   req.query.code;
  // console.log(`req.query.code`, req.query.code);
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
//access token is going to be passed in as an authorization header
gitubController.getUserData = async (req, res, next) => {
  req.get('Authorization'); // Bearer ACCESSTOKEN
  console.log(`hi`, req.get('Authorization'));
  try {
    const result = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: req.get('Authorization'),
      },
    });

    const data = await result.json();
    res.locals.status = data;
    console.log(`data from getUserData backend`, data);
    //username: data.login
    //email: data.email
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = gitubController;
