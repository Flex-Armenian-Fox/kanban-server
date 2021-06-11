const express = require('express');
const TaskController = require('../controllers/taskController');
const router = express.Router();
const {authorization} = require('../middlewares/auth.js')

router.get('/', TaskController.toList)
router.post('/', TaskController.addData)
router.delete('/:id', authorization, TaskController.deleteData)

module.exports = router;