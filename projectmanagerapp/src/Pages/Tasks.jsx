import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { CheckCircle, Trash2, ListTodo, FolderOpen } from "lucide-react";
import PageHeader from "../Components/PageHeader";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";


export default function Tasks() {
  const { projects, addTaskToProject, updateTaskStatus, deleteTask: deleteProjectTask } = useOutletContext();
  
  const [name, setName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [priority, setPriority] = useState("medium");
  
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id.toString());
    }
  }, [projects, selectedProject]);

  const allTasks = projects.flatMap(project => 
    (project.tasks || []).map(task => ({
      ...task,
      projectId: project.id,
      projectName: project.name
    }))
  );

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!name.trim() || !selectedProject) return;

    const newTask = {
      name: name.trim(),
      assignedTo: assignedTo.trim() || "Unassigned",
      dueDate: dueDate || "No date",
      priority,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    addTaskToProject(Number(selectedProject), newTask);
    
    setName("");
    setAssignedTo("");
    setDueDate("");
    setPriority("medium");
  };

  const handleToggleStatus = (projectId, taskId, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    updateTaskStatus(projectId, taskId, newStatus);
  };

  const handleDeleteTask = (projectId, taskId) => {
    deleteProjectTask(projectId, taskId);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-gradient-to-br from-sky-50 to-white min-h-screen">
      <PageHeader 
        title="Task Management" 
        icon={ListTodo}
        subtitle="Create and manage tasks across your projects"
      />

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-64 text-center py-12">
          <FolderOpen size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-2">No projects available</p>
          <p className="text-gray-400">Create a project first to start adding tasks</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:gap-8">
          <Card className="w-full max-w-4xl">
            <h3 className="text-xl font-semibold text-sky-800 mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="Task Name"
                  placeholder="Enter task name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Assign To"
                  placeholder="Assign to"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                />
                <Input
                  label="Due Date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <div>
                  <label className="block text-sky-700 font-medium mb-2">Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 bg-white"
                    required
                  >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sky-700 font-medium mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!name.trim() || !selectedProject}
              >
                Add Task
              </Button>
            </form>
          </Card>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-sky-700 mb-6 flex items-center gap-2">
              <ListTodo size={24} className="text-sky-500" />
              All Tasks ({allTasks.length})
            </h3>
            
            {allTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-32 text-center py-8">
                <p className="text-gray-500 text-lg">No tasks yet. Start by adding one!</p>
              </div>
            ) : (
              <div className="grid gap-4 auto-rows-fr">
                {allTasks.map((task) => (
                  <Card key={`${task.projectId}-${task.id}`} hover>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-sky-800 mb-1 truncate">{task.name}</h4>
                        <p className="text-sky-600 text-sm mb-2">Project: {task.projectName}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="text-sky-600">Assigned: {task.assignedTo}</span>
                          <span className="text-sky-600">Due: {task.dueDate}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}> 
                            {task.priority} priority
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === "completed" 
                              ? "text-green-700 bg-green-100" 
                              : "text-yellow-700 bg-yellow-100"
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 lg:ml-4 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(task.projectId, task.id, task.status)}
                          className="p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-50"
                          title={task.status === "completed" ? "Mark as pending" : "Mark as completed"}
                        >
                          <CheckCircle size={20} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(task.projectId, task.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          title="Delete task"
                        >
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}