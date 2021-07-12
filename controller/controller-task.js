'use strict'

const {User, Task} = require('../models')

class ControllerTask {

    static showAll (req, res, next) {
        Task.findAll({order: [['id', 'ASC']]})
            .then(tasks => {
                res.status(200).json({tasks})
            })
            .catch(err => {
                next(err)
            })
    }

    static showOne (req, res, next) {
        Task.findOne({where: {id: +req.params.id}})
            .then(task => {
                res.status(200).json({task})
            })
            .catch(err => {
                next(err)
            })
    }

    static createNew (req, res, next) {
        const input = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            category: req.body.category,
            UserId: req.currentUser.id
        }
        Task.create(input)
            .then(task => {
                res.status(201).json({task})
            })
            .catch(err => {
                next(err)
            })
    }

    static putOne (req, res, next) {
        const {title, description, due_date, category} = req.body
        Task.update({title, description, due_date, category}, {
            where: {id: +req.params.id},
            returning: true
        })
            .then(task => {
                if (task[0] === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Task with ID ${+req.params.id} not found`
                    }
                } else {
                    res.status(200).json({
                        message: `Task with ID ${req.params.id} has been successfully updated`,
                        updated_task: task[1]
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static patchOne (req, res, next) {
        const newCategory = req.body.category
        Task.update({category: newCategory}, {
            where: {id: +req.params.id},
            returning: true
        })
            .then(task => {
                if (task[0] === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Task with ID ${+req.params.id} not found`
                    }
                } else {
                    res.status(200).json({
                        message: `Task with ID ${req.params.id} has been successfully updated`,
                        updated_task: task[1]
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteOne (req, res, next) {
        Task.destroy({where: {id: +req.params.id}})
            .then(task => {
                res.status(200).json({
                    message: `Task with ID ${req.params.id} has been successfully deleted`
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerTask