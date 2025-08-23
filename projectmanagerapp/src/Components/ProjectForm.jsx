import { PlusCircle } from "lucide-react";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function ProjectForm({ name, setName, description, setDescription, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 lg:p-8 w-full max-w-2xl border border-sky-100"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Input
          label="Project Name"
          id="project-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          required
          className="flex flex-col gap-2"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="project-description" className="block text-sky-800 text-sm font-medium">
            Description
          </label>
          <textarea
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[96px] border border-sky-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-900 resize-none"
            placeholder="Enter project description"
          />
        </div>
      </div>
      <div className="flex justify-start">
        <Button
          type="submit"
          variant="secondary"
          size="md"
          disabled={!name.trim()}
          className="h-11 px-5"
        >
          <PlusCircle size={20} />
          Add Project
        </Button>
      </div>
    </form>
  );
}
