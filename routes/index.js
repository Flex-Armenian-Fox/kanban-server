const express = require('express');
const router = express.Router();
const taskRoute = require('./tasks-route')
const {authentication} = require('../middlewares/auth')
const userC = require('../controllers/userController')

router.post('/register', userC.postRegister)
router.post('/login', userC.postLogin)
router.post('/glogin', userC.gLogin)
router.use('/tasks', authentication, taskRoute)

module.exports = router; 