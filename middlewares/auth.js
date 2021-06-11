const {jwtDecrypt} = require("../helpers/jwt")
const {User, Task} = require("../models")

const authentication = (req, res, next) =>{
    try{
        const {access_token} = req.headers
        const dataDecoded = jwtDecrypt(access_token)
        User.findByPk(dataDecoded.id)
            .then(user => {
                if (!user){
                    throw {name: "AuthenticationError", message:"User not Found"}
                } else {
                    console.log('a')
                    req.currentUser = {id: user.id}
                    next()
                }
            }) .catch(err => {
                next(err)
            })
    } catch(err) {
        next(err)
    } 
}

const authorization = (req, res, next) => {
    Task.findOne({where:{id:id}})
        .then(task =>{
            if (!task) {
                throw {
                    name: "TaskNotFound",
                    message: `task with id ${id} not found`,
                }
            }
            if (todo.user_id == req.currentUser.id) {
                req.target = todo
                next()
            }
            else throw {name:"AuthorizationError"}
        }) .catch(err =>{
            next(err)
        })
}
module.exports = {authentication, authorization}