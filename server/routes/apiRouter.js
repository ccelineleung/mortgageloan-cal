const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController')
const { route } = require('../server/server.js')

//retrive all the homeInfos from the user
router.get('/allSavedforID', apiController.allSavedforId, (req,res) => {
    return res.status(200).json()
})

//edit the home info
route.patch('/editHomeInfo', apiController.editHomeInfo, (req,res) => {
    return res.status(200).json()
})

//delete the home
route.delete('/', apiController.deleteHome, (req,res) => {
    return res.status(200).json()
})

//save the home info
route.post('/addtoDB', apiController.addtoDB, (req,res) => {
    return res.status(200).json()
})
module.exports = router;