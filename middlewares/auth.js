const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
const { Task } = require('../models');

const authentication = (req, res, next) => {
  if (!req.headers.access_token) {
    throw {
      name: 'TokenMissing',
      message: 'Missing access token',
    };
  }

  try {
    const decoded = jwt.verify(req.headers.access_token, privateKey);
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

const tasksAuthorization = (req, res, next) => {
  const { id } = req.params;

  Task.findOne({ where: { id } })
    .then((task) => {
      if (!task) {
        throw {
          name: 'NotFound',
          message: 'task not found',
        };
      }
      return Task.findOne({ where: { id, UserId: req.userId } });
    })
    .then((task) => {
      if (!task) {
        throw {
          name: 'Unauthorized',
          message: 'user unauthorized',
        };
      }
      req.task = task;
      next();
    })
    .catch((err) => next(err));
};

module.exports = { authentication, tasksAuthorization };
