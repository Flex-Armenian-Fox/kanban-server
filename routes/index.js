const express = require('express');
const router = express.Router();
const taskRoute = require('./tasks-route')
const {authentication, authorization} = require('../middlewares/auth')
const userC = require('../controllers/userController')

router.post('/register', userC.postRegister)
router.post('/login', userC.postLogin)
router.use('/tasks', authentication, authorization, taskRoute)

module.exports = router; 