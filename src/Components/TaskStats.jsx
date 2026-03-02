import { ListTodo, CheckCircle2 } from "lucide-react";
import Card from "./UI/Card";

export default function TaskStats({ totalTasks, completedTasks }) {
  return (
    <Card className="mt-4 p-3 flex justify-between items-center text-gray-600 text-sm">
      <div className="flex items-center gap-1">
        <ListTodo size={16} className="text-sky-500" />
        <span>Total: {totalTasks}</span>
      </div>
      <div className="flex items-center gap-1">
        <CheckCircle2 size={16} className="text-green-500" />
        <span>Done: {completedTasks}</span>
      </div>
    </Card>
  );
}