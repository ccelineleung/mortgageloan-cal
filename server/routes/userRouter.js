const express = require('express');
// const apiController = require('../controllers/apiController');
const router = express.Router();

const userController = require('../controllers/userController');
const gitubController = require('../controllers/githubController')
//register new user
router.post(
  '/signup',
  userController.checkUsernameAndEmail,
  userController.newUserSignup,
  (req, res) => {
    return res.status(200).json(res.locals.status);
  }
);

router.post('/login', userController.loginUser, (req, res) => {
  return res.status(200).json(res.locals.status);
});


router.post('/getUsername', userController.getUsername, (req, res) => {
  return res.status(200).json(res.locals.status);
});

router.delete('/logout', userController.logOutUser, (req, res) => {
  return res.status(200).json(res.locals.status);
});

router.post('/protected', userController.protectedRoute, (req, res) => {
  return res.status(200).json(res.locals.status);
});

router.get('/refresh_token', userController.refreshToken, (req, res) => {
  return res.status(200).json(res.locals.status);
});

module.exports = router;
