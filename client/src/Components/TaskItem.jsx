import { CheckCircle, Trash2 } from "lucide-react";
import Button from "./UI/Button";

export default function TaskItem({ task, onStatusToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-sky-50 p-2 rounded-lg">
      <div className="flex-1">
        <span className="text-sm font-medium">{task.name}</span>
        <div className="text-xs text-gray-500 flex gap-2">
          <span>Due: {task.dueDate}

        </span>
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
          onClick={onStatusToggle}
          variant={task.status === 'completed' ? 'ghost' : 'ghost'}
          size="sm"
          className={task.status === 'completed' ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-green-800'}
          title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
        >
          <CheckCircle size={14} />
        </Button>
        <Button
          onClick={onDelete}
          variant="danger"
          size="sm"
          className="p-1 text-red-400 hover:text-red-600"
          title="Delete task"
        >
          <Trash2 size={12} />
        </Button>
      </div>
    </div>
  );
}