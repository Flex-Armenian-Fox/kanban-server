'use strict'

const route = require('express').Router()
const authorization = require('../helpers/authorization.js')
const ControllerTask = require('../controller/controller-task.js')

// di bawah ini SEMUA BUTUH AUTHENTICATION (Login dulu)

route.get('/', ControllerTask.showAll)
route.post('/', ControllerTask.createNew)

// need AUTHORISATION as router level middleware
route.put('/:id', authorization, ControllerTask.putOne)
route.patch('/:id', authorization, ControllerTask.patchOne)
route.delete('/:id', authorization, ControllerTask.deleteOne)

module.exports = route