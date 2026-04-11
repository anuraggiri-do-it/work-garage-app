const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProject, updateProject, deleteProject, addTask, updateTask, deleteTask } = require('../controllers/projectController');

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);
router.route('/:id/tasks').post(addTask);
router.route('/:id/tasks/:taskId').put(updateTask).delete(deleteTask);

module.exports = router;
