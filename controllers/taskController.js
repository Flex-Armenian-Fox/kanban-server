const {Task, User} = require('../models/index')
const {jwtEncrypt, jwtDecrypt} = require('../helpers/jwt')
const {compareHash} = require('../helpers/brcypt')

class Controller{
    static postTask(req, res, next){
        console.log('posting task')
        let task = req.body
        console.log(task)
        console.log(req.currentUser)
        task.UserId = req.currentUser.id
        Task.create(task, {returning: true})
            .then(r => {
                console.log(r)
                res.status(201).json({r})
            })
            .catch(err => {next(err)})
    }

    static getTask(req, res, next){
        Task.findAll({include:[{
            model: User,
            attributes: ["alias", "id"]
            }]
        })
            .then(taskData => {
                // console.log(taskData)
                taskData.forEach(el => {
                    if(el.User.id == req.currentUser.id) {el.dataValues.editable = true}
                })
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
        console.log('putting task')
        let data = req.body
        console.log(req.body)
        Task.update(data, {where: {id:req.params.id}, returning:true})
            .then(results =>{
                res.status(200).json(results[1])
            })
            .catch(err => next(err))
        }
        
    static patchTask(req, res, next){
        let data = {category: req.body.category}
        Task.update(data, {where: {id:req.params.id}, returning:true})
            .then(results =>{
                res.status(200).json(results[1])
            })
            .catch(err => next(err))
        
    }
    
}

module.exports = Controller