const db = require('../models/dbModels');

const gitubController = {};

const CLIENT_ID = '9cd0743fffb166dd3058';
const CLIENT_SECRET = '9c5e14ff4a28c13306853edd1387169c73045c3e';

gitubController.getAccessToken = async (req, res, next) => {
  // it wont run if the code is not exist
  req.query.code;

  const params =
    '?client_id=' +
    CLIENT_ID +
    '&client_secret=' +
    CLIENT_SECRET +
    '&code=' +
    req.query.code;

  await fetch('https://github.com/login/oauth/access_token' + params, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
};

//getUserData
// access token is going to be passed in as an Authorization header

gitubController.getUserData = async (req, res, next) => {
  let data;
  req.get('Authorization'); // Bearer ACCESSTOKEN
  await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((datas) => {
      console.log(data);
      //   res.json(data);
      data = datas;
    });

  const { data.Login} = data.Login
};

module.exports = gitubController;
