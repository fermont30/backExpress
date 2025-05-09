const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createTask, getTasks } = require('../controllers/taskController');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskId);
router.put('/:id', auth, updateTask);

module.exports = router;