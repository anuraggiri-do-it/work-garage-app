import { Trash2 } from "lucide-react";
import Button from "./UI/Button";
import Card from "./UI/Card";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 text-center py-8">
      <p className="text-gray-500 text-lg">No projects yet. Start by adding one!</p>
    </div>
  );
}

function ProjectCard({ project, onDelete }) {
  return (
    <Card
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 lg:p-5"
      hover
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-sky-800 text-lg font-semibold mb-1 truncate">{project.name}</h4>
        {project.description && (
          <p className="text-sky-600 text-sm line-clamp-2">{project.description}</p>
        )}
        <span className="text-xs text-sky-400 mt-1 block">
          {project.tasks?.length || 0} tasks
        </span>
      </div>
      <div className="flex justify-end sm:justify-center flex-shrink-0">
        <Button
          onClick={() => onDelete(project._id)}
          variant="danger"
          size="sm"
          className="p-2 rounded-full"
          aria-label={`Delete ${project.name} project`}
        >
          <Trash2 size={22} />
        </Button>
      </div>
    </Card>
  );
}

export default function ProjectList({ projects, onDelete }) {
  if (!projects || projects.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid gap-4 auto-rows-fr">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} onDelete={onDelete} />
      ))}
    </div>
  );
}