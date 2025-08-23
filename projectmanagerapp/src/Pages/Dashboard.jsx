import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";
import Modal from "../Components/UI/Modal";
import ProgressBar from "../Components/UI/ProgressBar";
import TaskStats from "../Components/TaskStats";
import ProjectActions from "../Components/UI/ProjectActions";
import RecentTasks from "../Components/UI/RecentTasks";

export default function Dashboard() {
  const { projects, updateTaskStatus, deleteTask, updateProject, deleteProject } = useOutletContext();
  const [editingProject, setEditingProject] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  return (
    <div className="p-4 lg:p-6 bg-gradient-to-br from-sky-50 to-white min-h-screen">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-sky-700 mb-8 lg:mb-10 text-center">
        Project Dashboard
      </h1>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-64">
          <p className="text-gray-500 text-lg text-center">
            No projects available. Create one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 auto-rows-fr">
          {projects.map((p) => {
            const totalTasks = (p.tasks || []).length;
            const completedTasks = (p.tasks || []).filter(
              (t) => t.status === "completed"
            ).length;
            const progress =
              totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

            return (
              <Card key={p.id} hover className="flex flex-col h-full">
                <h2 className="text-2xl font-bold text-sky-800 mb-2 truncate" title={p.name}>{p.name}</h2>
                <p className="text-sky-600 mb-4 line-clamp-3 text-sm" title={p.description}>{p.description}</p>

                <ProgressBar progress={progress} className="mb-4" />
                <div className="text-sm text-sky-700 font-semibold text-right mb-2">
                  {completedTasks}/{totalTasks} tasks
                </div>

                <TaskStats totalTasks={totalTasks} completedTasks={completedTasks} />

                <ProjectActions
                  onEdit={() => {
                    setEditingProject(p.id);
                    setEditName(p.name);
                    setEditDescription(p.description);
                  }}
                  onDelete={() => deleteProject(p.id)}
                />

                <RecentTasks 
                  tasks={p.tasks}
                  projectId={p.id}
                  updateTaskStatus={updateTaskStatus}
                  deleteTask={deleteTask}
                />
              </Card>
            );
          })}
        </div>
      )}

      <Modal 
        isOpen={!!editingProject} 
        onClose={() => setEditingProject(null)}
        title="Edit Project"
      >
        <div className="space-y-4">
          <Input
            placeholder="Project name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg resize-none min-h-[6rem] max-h-32 overflow-y-scroll word-wrap break-word focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="Project description"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                updateProject(editingProject, { name: editName, description: editDescription });
                setEditingProject(null);
              }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditingProject(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
