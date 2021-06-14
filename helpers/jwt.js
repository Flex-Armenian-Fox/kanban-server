'use strict'

const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY

function signToken(payload) {
    const generatedToken = jwt.sign(payload, secretKey)
    return generatedToken
}

function verifyToken(input_token) {

}

module.exports = {
    signToken,
    verifyToken
}