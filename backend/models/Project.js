const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assignedTo: { type: String, default: 'Unassigned' },
  dueDate: { type: String, default: 'No date' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' },
  tasks: [taskSchema]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
