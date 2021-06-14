'use strict'

const route = require('express').Router()
const ControllerUser = require('../controller/controller-user.js')

route.post('/register', ControllerUser.register)
route.post('/login', ControllerUser.login)

module.exports = route