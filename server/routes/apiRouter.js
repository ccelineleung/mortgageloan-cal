const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter.js');
const apiController = require('../controllers/apiController')

const path = require('path');

//retrive all the homeInfos from the user
router.get('/allSavedforID', apiController.allSavedforId, (req,res) => {
    return res.status(200).json(res.locals.status)
})

//edit the home info
router.patch('/editHomeInfo', apiController.editHomeInfo, (req,res) => {
    return res.status(200).json(res.locals.status)
})

//delete the home
router.delete('/', apiController.deleteHome, (req,res) => {
    return res.status(200).json(res.locals.status)
})

//save the home info
router.post('/addtoDB', apiController.addtoDB, (req,res) => {
    return res.status(200).json(res.locals.status)
})

//routes login/signup requests to userRoute router
router.use('/users', userRouter);

module.exports = router;