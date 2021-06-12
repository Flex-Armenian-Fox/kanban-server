'use strict'

const {task} = require('../models/index.js');

class taskController{
    static toList(req, res, next){
        task.findAll({
            order: ['id'],
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static addData(req, res, next){
        console.log(req.body)
        req.body.userid = req.currentUser.id
        task.create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })   
    }

    static deleteData(req, res, next){
        console.log("DELETE")
        task.findOne({
            where: {id: req.params.id}
        })
        .then(result => {
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `task with Id ${req.params.id} Not Found`
                })
            } else {
                return task.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(() => {
            res.status(200).json({"message": "task success to delete"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = taskController;