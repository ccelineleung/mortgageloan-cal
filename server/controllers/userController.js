const { UNSAFE_NavigationContext } = require('react-router-dom');
const db = require('../models/dbModels');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const {
  createAccressToken,
  createRefreshToken,
  // sendAccessToken,
  sendRefreshToken,
} = require('../jwt/token');
const { isAuth } = require('../jwt/isAuth');

const userController = {};

userController.checkUsernameAndEmail = async (req, res, next) => {
  const { username, email } = req.body;
  const param = [email];
  // console.log('this is the body',req.body)
  try {
    const checkQuery = `
        SELECT * FROM users
        WHERE email = $1
        `;
    const checkUserAndEmail = await db.query(checkQuery, param);
    // console.log('checkUserAndEmail::::', checkUserAndEmail.rows.length);
    ``;
    if (checkUserAndEmail.rows.length === 0) {
      return next();
    } else {
      return res
        .status(404)
        .json({ status: false, message: 'Email already existed!' });
    }
  } catch (error) {
    return next({
      log: 'Express error in checkUsernameAndEmail middleware',
      status: 400,
      message: {
        err: `userController.checkUsernameAndEmail: ERROR: ${error}`,
      },
    });
  }
};

userController.newuUserSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  const param = [username, email, hashedPassword];
  // console.log(param);
  try {
    const newCharQuery = `
        INSERT INTO users(username, email, password,refreshtoken,githubUser)
        VALUES($1,$2, $3, 0,0)
        RETURNING *;
        `;

    const result = await db.query(newCharQuery, param);
    // console.log('newuUserSignup::::', result);

    res.locals.user_id = result.rows[0].user_id;
    res.locals.status = {
      userId: result.rows[0].user_id,
      accesstoken: result.rows[0].accesstoken,
      username: result.rows[0].username,
      status: true,
      message: 'Account has been created!',
    };

    return next();
  } catch (error) {
    console.log(error.message);
    return next({
      log: 'Express error in newuUserSignup middleware',
      status: 400,
      message: {
        err: `userController.newuUserSignup: ERROR: ${error}`,
      },
    });
  }
};

userController.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const param = [email];

  try {
    const checkEmailQuery = `
    SELECT * FROM users
    WHERE email = $1
    `;

    const returnData = await db.query(checkEmailQuery, param);
    // console.log('this is returnData', returnData);

    //1. find user in 'database'. if not exist send error
    if (returnData.rows.length === 0) {
      return res.status(404).json({ status: false, message: 'Wrong Email' });
    }
    //2. compare bcrypted password and see if it checks out. send error if not
    const passwordFromDB = returnData.rows[0].password;
    const user_id = returnData.rows[0].user_id;
    const valid = await compare(password, passwordFromDB);

    if (!valid) {
      return res.status(404).json({ status: false, message: 'Wrong Password' });
    }
    //3, create refresh and accesstoken
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
      message: 'Successful logged in',
    };
    return next();
  } catch (error) {
    console.log(`error from login backend`, error);
    return next({
      log: 'Express error in loginUser middleware',
      status: 400,
      message: {
        err: `userController.loginUser: ERROR: ${error}`,
      },
    });
  }
};

userController.logOutUser = (req, res, next) => {
  try {
    // res.clearCookie('refreshtoken', { path: '/protected' });
    res.clearCookie('refreshtoken');
    res.locals.status = {
      message: 'Logged out',
    };
    return next();
  } catch (error) {
    return next({
      log: 'Express error in logOutUser middleware',
      status: 400,
      message: {
        err: `userController.logOutUser: ERROR: ${error}`,
      },
    });
  }
};

//create protected route
userController.protectedRoute = async (req, res, next) => {
  try {
    const userId = await isAuth(req);

    // console.log(`userID`, userId);
    if (userId) {
      res.locals.stats = {
        data: 'This is protected data',
      };

      return next();
    } else {
      return res
        .status(404)
        .json({ message: `USER HAS NO PERMISSION TO THIS PAGE` });
    }
  } catch (error) {
    console.log(error.message);
    return next({
      log: 'Express error in protectedRoute middleware',
      status: 400,
      message: {
        err: `userController.protectedRoute: ERROR: ${error}`,
      },
    });
  }
};

//get a new access token with a refresh token
userController.refreshToken = async (req, res, next) => {
  const token = req.cookies.refreshtoken;
  //if we dont have a token in our request
  // console.log(`res.cookies`, req.cookies);
  console.log(`THIS IS TOKEN from refreshToken middleware`, token);

  if (!token) return res.send({ accesstoken: '' });
  //if we have a token, lets verify it
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log(`payload from refreshtoken`, payload);
  } catch (err) {
    return res.send({ accesstoken: 'ERROR' });
  }

  //token is valid, check if user exist
  const findUserQuery = `
  SELECT * FROM users 
  WHERE user_id = $1
  `;
  const param = [payload.userId];
  // console.log(`this is param`, param);

  const returnUserData = await db.query(findUserQuery, param);
  // console.log(`this is returnUserData`, returnUserData);

  if (returnUserData.rows.length === 0) return res.send({ accesstoken: '' });
  // user exist, check if refreshtoken exist on user
  if (returnUserData.rows[0].refreshtoken !== token) {
    return res.send({ accesstoken: '' });
  }

  //token exist, create new refresh and access token
  const user_id = returnUserData.rows[0].user_id;
  const accesstoken = createAccressToken(user_id);
  const refreshtoken = createRefreshToken(user_id);

  const updateRefreshTokenQuery = `
  UPDATE users
  SET refreshtoken = $2
  WHERE user_id = $1
  RETURNING *
  `;
  const paramTwo = [user_id, refreshtoken];

  await db.query(updateRefreshTokenQuery, paramTwo);

  //all good to go ,send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  console.log(`THE LAST USERID`, user_id);
  return res.send({ accesstoken: 'accesstoken' });
};

userController.getUsername = async (req, res, next) => {
  const { userId } = req.body;
  const param = [userId];

  try {
    const getUsernameQuery = `
    SELECT * FROM users
    WHERE user_id = $1
    `;

    const result = await db.query(getUsernameQuery, param);
    // console.log('newuUserSignup::::', result);

    res.locals.username = result.rows[0].username;
    res.locals.status = {
      username: result.rows[0].username,
      status: true,
    };

    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: 'Express error in getUsername middleware',
      status: 400,
      message: {
        err: `userController.getUsername: ERROR: ${error}`,
      },
    });
  }
};

module.exports = userController;
