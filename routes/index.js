const express = require('express');
const router = express.Router();
const {authentication} = require('../middlewares/auth.js')

router.use('/users', require('./users.js'))
router.use(authentication)
router.use('/tasks', require('./task'))

module.exports = router;