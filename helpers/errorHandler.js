'use strict'

function errorHandler(err, req, res, next) {

    let httpStatus
    let errorMsg

    switch (err.name) {

        case 'SequelizeValidationError':
            httpStatus = 400
            errorMsg = err.message
            break

        case 'Not Found':
            httpStatus = 404
            errorMsg = err.message
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