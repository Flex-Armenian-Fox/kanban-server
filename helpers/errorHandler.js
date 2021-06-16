'use strict'

function errorHandler(err, req, res, next) {

    let httpStatus
    let errorMsg = err.message

    switch (err.name) {

        case 'SequelizeValidationError':
        case 'UniqueConstraintError':
            httpStatus = 400
            break

        case 'Not Found':
            httpStatus = 404
            break

        case 'Not Authorised':
        case 'JsonWebTokenError':
            httpStatus = 401
            break

        default:
            httpStatus = 500
            errorMsg = 'Internal Server Error'

    }

    res.status(httpStatus).json({
        message: errorMsg
    })

}

module.exports = errorHandler