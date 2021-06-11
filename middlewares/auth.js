const {jwtDecrypt} = require("../helpers/jwt")
const {User, Todo} = require("../models")

const authentication = (req, res, next) =>{
    try{
        const {access_token} = req.headers
        const dataDecoded = jwtDecrypt(access_token)
        User.findByPk(dataDecoded.id)
            .then(user => {
                if (!user){
                    throw {name: "AuthenticationError", message:"User not Found"}
                } else {
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

module.exports = {authentication, todoAuth}