'use strict'

const route = require('express').Router()
const ControllerTask = require('../controller/controller-task.js')

route.get('/', ControllerTask.showAll)
route.post('/', ControllerTask.createNew)

// need AUTHORISATION as router level middleware
route.put('/:id', ControllerTask.putOne)
route.patch('/:id', ControllerTask.patchOne)
route.delete('/:id', ControllerTask.deleteOne)

module.exports = route