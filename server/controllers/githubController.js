const db = require('../models/dbModels');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const dotenv = require('dotenv');
const {
  createAccressToken,
  createRefreshToken,
  // sendAccessToken,
  sendRefreshToken,
} = require('../jwt/token');
const { isAuth } = require('../jwt/isAuth');
const gitubController = {};

dotenv.config();

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
  // req.get('Authorization'); // Bearer ACCESSTOKEN
  const accessToken = req.headers['authorization'];
  const newAccessToken = accessToken.substring(6);

  try {
    const result = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    const data = await result.json();
    console.log(`data backfrom github`, data);
    const usernameFromGithub = data.login;

    const param1 = [usernameFromGithub];
    const checkQuery = `
    SELECT * FROM users
    WHERE username = $1 
  
    `;
    const checkUsername = await db.query(checkQuery, param1);
    console.log(`checkUsername`, checkUsername.rows);

    if (checkUsername.rows.length === 1) {
      const user_id = checkUsername.rows[0].user_id;
      const accesstoken = createAccressToken(user_id);
      const refreshtoken = createRefreshToken(user_id);

      const paramTwo = [user_id, refreshtoken];
      //4. put the refreshtoken in the database
      const insertRefreshToken = `
    UPDATE users
    SET refreshtoken = $2
    WHERE user_id = $1
    RETURNING *
    `;

      const data2 = await db.query(insertRefreshToken, paramTwo);
      // console.log(`data comeback from db`, data2);
      const username = data2.rows[0].username;
      //5. send token.refreshtoken as a cookie and accesstoken as a regular response
      sendRefreshToken(res, refreshtoken);
      // sendAccessToken(req, res, accesstoken, username);

      res.locals.status = {
        userId: user_id,
        accesstoken: accesstoken,
        username: username,
        status: true,
        message: 'Github Account Logged in!',
      };
      return next();
    } else {
      const param2 = [usernameFromGithub];

      const newUserQuery = `
      INSERT INTO users(username, email, password,refreshtoken,githubUser)
      VALUES($1,null, 0, 0,1)
      RETURNING *;
        `;

      const dbResult = await db.query(newUserQuery, param2);

      // res.locals.user_id = dbResult.rows[0].user_id;
      // res.locals.status = {
      //   userId: dbResult.rows[0].user_id,
      //   username: dbResult.rows[0].username,
      //   status: true,
      //   message: 'Account has been created!',
      // };

      const user_id = dbResult.rows[0].user_id;
      const accesstoken = createAccressToken(user_id);
      const refreshtoken = createRefreshToken(user_id);

      const paramTwo = [user_id, refreshtoken];
      //4. put the refreshtoken in the database
      const insertRefreshToken = `
    UPDATE users
    SET refreshtoken = $2
    WHERE user_id = $1
    RETURNING *
    `;

      const data2 = await db.query(insertRefreshToken, paramTwo);
      // console.log(`data comeback from db`, data2);
      const username = data2.rows[0].username;
      //5. send token.refreshtoken as a cookie and accesstoken as a regular response
      sendRefreshToken(res, refreshtoken);
      // sendAccessToken(req, res, accesstoken, username);

      res.locals.status = {
        userId: user_id,
        accesstoken: accesstoken,
        username: username,
        status: true,
        message: 'Github Account has been created!',
      };
      return next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = gitubController;
