import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PlusCircle, FolderOpen } from "lucide-react";
import PageHeader from "../Components/PageHeader";
import ProjectForm from "../Components/ProjectForm";
import ProjectList from "../Components/ProjectList";

export default function Projects() {
  const { projects, setProjects, deleteProject } = useOutletContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await setProjects({ name: name.trim(), description: description.trim() });
    setName("");
    setDescription("");
  };

  return (
    <div className="p-4 lg:p-6 bg-gradient-to-br from-sky-50 to-white min-h-screen">
      <PageHeader
        title="Create New Project"
        icon={PlusCircle}
        subtitle="Organize your work with projects"
      />
      <div className="flex flex-col gap-6 lg:gap-8">
        <ProjectForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          onSubmit={handleSubmit}
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-sky-700 mb-4 flex items-center gap-2">
            <FolderOpen size={24} className="text-sky-500" />
            Your Projects ({projects.length})
          </h3>
          <ProjectList projects={projects} onDelete={(id) => deleteProject(id)} />
        </div>
      </div>
    </div>
  );
}
