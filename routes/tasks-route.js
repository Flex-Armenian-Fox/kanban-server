const express = require('express');
const router = express.Router();
const taskC = require('../controllers/taskController')
const {authorization} = require('../middlewares/auth')

router.post('/', taskC.postTask)
router.get('/', taskC.getTask)
router.put('/:id', authorization, taskC.putTask)
router.delete('/:id', authorization, taskC.deleteTask)
router.patch('/:id', authorization, taskC.patchTask)

module.exports = router; 