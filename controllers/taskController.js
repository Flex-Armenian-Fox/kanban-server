const {Task} = require('../models/index')
const {jwtEncrypt, jwtDecrypt} = require('../helpers/jwt')
const {compareHash} = require('../helpers/brcypt')

class Controller{
    static postTask(req, res, next){
        let task = req.body
        task.UserId = req.currentUser.id
        task.deadline = new Date()
        task.deadline = task.deadline.toISOString()
        Task.create(task, {returning: true})
            .then(r => {
                console.log(r)
                res.status(201).json({r})
            })
            .catch(err => {next(err)})
    }

    static getTask(req, res, next){
        Task.findAll()
            .then(taskData => {
                res.status(200).json(taskData)
            })
            .catch(err => {next(err)})
    }
    
    static deleteTask(req, res, next){
        Task.destroy({where: {id:req.params.id}, returning:true})
            .then(taskData => {
                res.status(200).json("delete success")
            })
            .catch(err => {next(err)})
    }
    
    static putTask(req, res, next){
        
    }

    static patchTask(req, res, next){
        
    }
    
}

module.exports = Controller