const express = require('express');
// const apiController = require('../controllers/apiController');
const router = express.Router();

const gitubController = require('../controllers/githubController');

router.get('/getAccessToken', gitubController.getAccessToken, (req, res) => {
  return res.status(200).json(res.locals.status);
});

router.get('/getUserData', gitubController.getUserData, (req, res) => {
    return res.status(200).json(res.locals.status);
  });

module.exports = router;
