'use strict'

const {User} = require('../models')
const {verifyPassword} = require('../helpers/bcrypt.js')
const {signToken} = require('../helpers/jwt.js')
const {OAuth2Client} = require('google-auth-library')

class ControllerUser {

    static googleLogin (req, res, next) {

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

        let emailToRegister = ''
        const {google_access_token} = req.headers

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                return ticket.getPayload()
            })
            .then(payload => {
                emailToRegister = payload.email
                return User.findOne({where: {email: payload.email}})
            })
            .then(user => {
                if (!user) { 
                    return User.create({
                        email: emailToRegister,
                        password: Math.random().toString(36).slice(-8)
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                const token = signToken({
                    id: user.id,
                    email: user.email
                })
                console.log(token)
                return res.status(200).json({
                    accesstoken: token
                })
            })
            .catch(err => {
                console.log('MASUK ERROR GOOGLE SIGN IN')
                next(err)
            })
    }

    static register (req, res, next) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOrCreate({
            where: {email: req.body.email},
            defaults: input
        })
            .then(user => {
                console.log('INI USER[1]', user[1])
                if (user[1] === false) {
                    throw {
                        name: 'UniqueConstraintError',
                        message: 'Email already registered'
                    }
                } else {
                    res.status(201).json({
                        message: `User with email ${user[0].email} successfully created`
                    })
                }
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
                        const payload = {
                            id: user.id,
                            email: user.email
                        }
                        const token = signToken(payload)
                        res.status(200).json({
                            accesstoken: token
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ControllerUser