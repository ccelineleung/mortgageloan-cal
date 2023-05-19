const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter.js');
const githubRouter = require('./githubRouter.js')
const apiController = require('../controllers/apiController');

const path = require('path');

//retrive all the homeInfos from the user
router.post('/allSavedforID', apiController.allSavedforId, (req, res) => {
  return res.status(200).json(res.locals.status);
});

//edit the home info
router.patch(
  '/editHomeInfo',
  apiController.editHomeInfo,
  apiController.allSavedforId,
  (req, res) => {
    return res.status(200).json(res.locals.status);
  }
);

//delete the home
router.delete(
  '/delete',
  apiController.deleteHome,
  apiController.allSavedforId,
  (req, res) => {
    return res.status(200).json(res.locals.status);
  }
);

//save the home info
router.post('/addtoDB', apiController.addtoDB, (req, res) => {
  return res.status(200).json(res.locals.status);
});

//routes login/signup requests to userRoute router
router.use('/users', userRouter);
//routes for github Oauth
router.use('/github',githubRouter)

module.exports = router;
