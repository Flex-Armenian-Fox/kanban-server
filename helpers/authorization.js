'use strict'

const {Task} = require('../models')

function authorization (req, res, next) {

    const taskId = req.params.id
    const currentUserId = req.currentUser.id

    Task.findByPk(taskId)
        .then(task => {

            if (!task) { // Task TIDAK ketemu
                throw {
                    name: 'Not Found',
                    message: `Task with ID ${taskId} not found`
                }
            } else { // Task KETEMU

                if (task.UserId !== currentUserId) { // User tidak berwenang
                    throw {
                        name: 'Not Authorised',
                        message: `User ${currentUserId} does not have permission`
                    }
                } else { // User berwenang
                    next()
                }
            }

        })
        .catch(err => {
            next(err)
        })

    /* 
    cari dulu task sesuai taskId ada tidak
        - kalau tidak ada, langsung error
        - kalau ada, apakah UserId Task tersebut === currentUserId tidak
            - kalau tidak sama, Authorization error > not permitted
            - kalau sama, next()
     */
}

module.exports = authorization