const { UNSAFE_NavigationContext } = require('react-router-dom');
const db = require('../models/dbModels');

const userController = {};

userController.checkUsernameAndEmail = async (req, res, next) => {
  const { username, email, password } = req.body;
  const param = [username, email, password];

  try {
    const checkQuery = `
        SELECT * FROM users
        WHERE email = $2
        `;
    const checkUserAndEmail = await db.query(checkQuery, param);

    console.log('checkUserAndEmail', checkUserAndEmail);

    if (checkUserAndEmail.row.length === 0) {
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
  const param = [username, email, password];

  try {
    const newCharQuery = `
        INSERT INTO users(username, password, money)
        VALUES($1,$2, $3)
        RETURNING *;
        `;

    const result = await db.query(newCharQuery, param);

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
