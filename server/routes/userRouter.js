const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

const userController = require('../controllers/userController');

const { route } = require('../server/server.js');

//register new user
router.post(
  '/signup',
  userController.checkUsernameAndEmail,
  userController.newuUserSignup,
  (req, res) => {
    return res.status(200).json(res.locals.status);
  }
);

module.exports = router;
