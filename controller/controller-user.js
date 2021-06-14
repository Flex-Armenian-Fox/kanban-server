'use strict'

const {User} = require('../models')
const {verifyPassword} = require('../helpers/bcrypt.js')

class ControllerUser {

    static register (req, res, next) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(input)
            .then(user => {
                res.status(201).json({
                    message: `User with email ${user.email} successfully created!`
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login (req, res, next) {
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if (!user) {
                    throw {
                        name: 'Not Found',
                        message: 'Email/password incorrect'
                    }
                } else {
                   const comparePW = verifyPassword(req.body.password, user.password)
                   if (!comparePW) {
                       throw {
                           name: 'Not Authorised',
                           message: 'Email/password incorrect'
                       }
                   } else { // generate JWT

                   }

                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ControllerUser