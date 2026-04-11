import { Edit, Trash2 } from "lucide-react";
import Button from "./Button";

export default function ProjectActions({ onEdit, onDelete }) {
  return (
    <div className="flex justify-between mt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
      >
        <Edit size={14} /> Edit
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 size={14} /> Delete
      </Button>
    </div>
  );
}