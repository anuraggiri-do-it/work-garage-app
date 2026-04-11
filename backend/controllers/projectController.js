const Project = require('../models/Project');

const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

const createProject = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const project = await Project.create({ name, description });
  res.status(201).json(project);
};

const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
};

const addTask = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  project.tasks.push(req.body);
  await project.save();
  res.status(201).json(project);
};

const updateTask = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const task = project.tasks.id(req.params.taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  Object.assign(task, req.body);
  await project.save();
  res.json(project);
};

const deleteTask = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  project.tasks.pull({ _id: req.params.taskId });
  await project.save();
  res.json(project);
};

module.exports = { getProjects, createProject, getProject, updateProject, deleteProject, addTask, updateTask, deleteTask };
