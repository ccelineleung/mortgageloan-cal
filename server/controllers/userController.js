const { UNSAFE_NavigationContext } = require('react-router-dom');
const db = require('../models/dbModels');
const {verify} = require('jsonwebtoken')
const {hash,compare} = require('bcryptjs')

const userController = {};

userController.checkUsernameAndEmail = async (req, res, next) => {
  const { username, email} = req.body;
  const param = [username, email];
  // console.log('this is the body',req.body)
  try {
    const checkQuery = `
        SELECT * FROM users
        WHERE username = $1 AND email = $2
        `;
        const checkUserAndEmail = await db.query(checkQuery, param);
        // console.log('checkUserAndEmail::::', checkUserAndEmail);


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
  const hashedPassword = hash(password,10)
  console.log('this is password',hashedPassword)
  const param = [username, email, hashedPassword];

  try {
    const newCharQuery = `
        INSERT INTO users(username, email, password)
        VALUES($1,$2, $3)
        RETURNING *;
        `;

    const result = await db.query(newCharQuery, param);
    // console.log('newuUserSignup::::', result);

    res.locals.user_id = result.rows[0].user_id;
    res.locals.status = {
      user_id: result.rows[0].user_id,
      status: true,
      message: 'Account has been created!',
    };

    return next();
  } catch (error) {
    return next({
      log: 'Express error in newuUserSignup middleware',
      status: 400,
      message: {
        err: `userController.newuUserSignup: ERROR: ${error}`,
      },
    });
  }
};

module.exports = userController;
