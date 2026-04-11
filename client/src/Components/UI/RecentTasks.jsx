import { CheckCircle, Trash2 } from "lucide-react";
import Button from "./Button";


export default function RecentTasks({ tasks, projectId, updateTaskStatus, deleteTask }) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div 
     className="mt-4 space-y-2 flex-1">
  <h4 className="font-semibold text-sky-700">Recent Tasks:</h4>
      {tasks.slice(0, 3).map((task) => (
        <div key={task._id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-sky-50 p-2 rounded-lg gap-2">
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium truncate block" title={task.name}>{task.name}</span>
            <div 
          className="text-xs text-gray-500 flex gap-2">
              <span>Due: {task.dueDate}</span>
              <span className={`px-1 rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-600' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {task.priority}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateTaskStatus(projectId, task._id, task.status === 'pending' ? 'completed' : 'pending')}
              className={`${task.status === 'completed' ? 'text-green-600' : 'text-gray-400'} hover:text-green-800 p-1`}
              title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
            >
              <CheckCircle size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(projectId, task._id)}
              className="text-red-400 hover:text-red-600 p-1"
              title="Delete task"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        </div>
      ))}
      {tasks.length > 3 && (
        <p className="text-xs text-gray-500 text-center">+{tasks.length - 3} more tasks</p>
      )}
    </div>
  );
}