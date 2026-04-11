import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LayoutDashboard, FolderOpen, ListTodo, Settings } from "lucide-react";
import * as api from "../api";

function SidebarIcon({ type, theme }) {
  const size = 20;
  const color = theme === "dark" ? "#60a5fa" : "#0ea5e9";
  switch (type) {
    case "dashboard": return <LayoutDashboard size={size} color={color} />;
    case "projects": return <FolderOpen size={size} color={color} />;
    case "tasks": return <ListTodo size={size} color={color} />;
    case "settings": return <Settings size={size} color={color} />;
    default: return null;
  }
}

function Layout() {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState({
    name: "User",
    email: "user@example.com",
    avatar: "https://via.placeholder.com/50",
    title: "",
  });
  const [theme, setTheme] = useState(() => localStorage.getItem("projectManagerTheme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    api.getProjects().then((res) => setProjects(res.data)).catch(console.error);
    api.getProfile().then((res) => setProfile(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem("projectManagerTheme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Projects
  const handleCreateProject = async (data) => {
    const res = await api.createProject(data);
    setProjects((prev) => [res.data, ...prev]);
  };

  const handleUpdateProject = async (id, data) => {
    const res = await api.updateProject(id, data);
    setProjects((prev) => prev.map((p) => (p._id === id ? res.data : p)));
  };

  const handleDeleteProject = async (id) => {
    await api.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  // Tasks
  const addTaskToProject = async (projectId, task) => {
    const res = await api.addTask(projectId, task);
    setProjects((prev) => prev.map((p) => (p._id === projectId ? res.data : p)));
  };

  const updateTaskStatus = async (projectId, taskId, status) => {
    const res = await api.updateTask(projectId, taskId, { status });
    setProjects((prev) => prev.map((p) => (p._id === projectId ? res.data : p)));
  };

  const handleUpdateTask = async (projectId, taskId, data) => {
    const res = await api.updateTask(projectId, taskId, data);
    setProjects((prev) => prev.map((p) => (p._id === projectId ? res.data : p)));
  };

  const deleteTask = async (projectId, taskId) => {
    const res = await api.deleteTask(projectId, taskId);
    setProjects((prev) => prev.map((p) => (p._id === projectId ? res.data : p)));
  };

  // Profile
  const handleUpdateProfile = async (data) => {
    const res = await api.updateProfile(data);
    setProfile(res.data);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col lg:flex-row ${theme === "dark" ? "bg-slate-900" : "bg-gray-100"}`}>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-sky-600 text-white rounded-full p-2 shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label="Toggle sidebar"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div
        ref={sidebarRef}
        className={`fixed lg:static top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          background: theme === "dark" ? "linear-gradient(to bottom right, #1e293b, #334155)" : "linear-gradient(to bottom right, #e0f2fe, #f0f9ff)",
          minHeight: "100vh",
          borderRight: theme === "dark" ? "1px solid #334155" : "1px solid #bae6fd",
        }}
      >
        <Sidebar
          theme={theme}
          profile={profile}
          navItems={[
            { to: "/", label: "Dashboard", icon: <SidebarIcon type="dashboard" theme={theme} /> },
            { to: "/projects", label: "Projects", icon: <SidebarIcon type="projects" theme={theme} /> },
            { to: "/tasks", label: "Tasks", icon: <SidebarIcon type="tasks" theme={theme} /> },
            { to: "/settings", label: "Settings", icon: <SidebarIcon type="settings" theme={theme} /> },
          ]}
        />
      </div>

      <main className="flex-1 p-4 lg:p-8 overflow-auto" style={{ minHeight: "100vh" }}>
        <Outlet
          context={{
            projects,
            setProjects: handleCreateProject,
            addTaskToProject,
            updateTaskStatus,
            updateTask: handleUpdateTask,
            deleteTask,
            updateProject: handleUpdateProject,
            deleteProject: handleDeleteProject,
            profile,
            updateProfile: handleUpdateProfile,
            theme,
            toggleTheme,
          }}
        />
      </main>
    </div>
  );
}

export default Layout;
