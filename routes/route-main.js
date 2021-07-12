'use strict'

const route = require('express').Router()
const routeUser = require('./route-user.js')
const routeTask = require('./route-task.js')
const authentication = require('../helpers/authentication.js')

route.use('/users', routeUser)

route.use(authentication)
route.use('/tasks', routeTask)

module.exports = route