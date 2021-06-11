const express = require('express');
const router = express.Router();
const taskC = require('../controllers/taskController')
const {authorization} = require('../middlewares/auth')

router.put('/', taskC.putTask)
router.post('/', taskC.postTask)
router.get('/', taskC.getTask)
router.delete('/', taskC.deleteTask)
router.patch('/', taskC.patchTask)

module.exports = router; 