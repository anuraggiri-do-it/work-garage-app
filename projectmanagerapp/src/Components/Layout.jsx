import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LayoutDashboard, FolderOpen, ListTodo, Settings } from "lucide-react";

import { useRef } from "react";

function Layout() {
  const navItems = [
    { to: "/", label: "Dashboard", icon: "dashboard" },
    { to: "/projects", label: "Projects", icon: "projects" },
    { to: "/tasks", label: "Tasks", icon: "tasks" },
    { to: "/settings", label: "Settings", icon: "settings" },
  ];

  // ...existing state and logic...
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('projectManagerProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: "Andrew Johns",
      email: "adj221@gmail.com",
      avatar: "https://via.placeholder.com/50",
      title: "Project Manager"
    };
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('projectManagerTheme');
    return savedTheme || 'light';
  });
  useEffect(() => {
    localStorage.setItem('projectManagerProfile', JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    localStorage.setItem('projectManagerTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projectManagerProjects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  useEffect(() => {
    localStorage.setItem('projectManagerProjects', JSON.stringify(projects));
  }, [projects]);
  const addTaskToProject = (projectId, task) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...(project.tasks || []), { 
                ...task, 
                id: Date.now(), // Ensure unique ID
                createdAt: task.createdAt || new Date().toISOString(),
                status: task.status || 'pending'
              }],
            }
          : project
      );
      localStorage.setItem('projectManagerProjects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  const updateTaskStatus = (projectId, taskId, newStatus) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: (project.tasks || []).map((task) =>
                task.id === taskId 
                  ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } 
                  : task
              ),
            }
          : project
      );
      localStorage.setItem('projectManagerProjects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  const deleteTask = (projectId, taskId) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: (project.tasks || []).filter((task) => task.id !== taskId),
            }
          : project
      );
      localStorage.setItem('projectManagerProjects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  const updateTask = (projectId, taskId, updatedTask) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: (project.tasks || []).map((task) =>
                task.id === taskId 
                  ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() } 
                  : task
              ),
            }
          : project
      );
      localStorage.setItem('projectManagerProjects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  const updateProject = (projectId, updatedData) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === projectId 
          ? { ...project, ...updatedData, updatedAt: new Date().toISOString() } 
          : project
      );
      localStorage.setItem('projectManagerProjects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  const deleteProject = (projectId) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.filter((project) => project.id !== projectId);
      localStorage.setItem('projectManagerProjects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  const updateProfile = (updatedProfile) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  // Sidebar toggle logic
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  // Helper for sidebar icons
  function SidebarIcon({ type, theme }) {
    const size = 20;
    const color = theme === 'dark' ? '#60a5fa' : '#0ea5e9';
    switch (type) {
      case "dashboard": return <LayoutDashboard size={size} color={color} />;
      case "projects": return <FolderOpen size={size} color={color} />;
      case "tasks": return <ListTodo size={size} color={color} />;
      case "settings": return <Settings size={size} color={color} />;
      default: return null;
    }
  }

  return (
    <div className={`min-h-screen w-full flex flex-col lg:flex-row ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'}`} style={{ minHeight: '100vh' }}>
      {/* Sidebar toggle button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-sky-600 text-white rounded-full p-2 shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Toggle sidebar"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      {/* Sliding Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:static top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ background: theme === 'dark' ? 'linear-gradient(to bottom right, #1e293b, #334155)' : 'linear-gradient(to bottom right, #e0f2fe, #f0f9ff)', minHeight: '100vh', maxHeight: '100vh', borderRight: theme === 'dark' ? '1px solid #334155' : '1px solid #bae6fd' }}
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
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto" style={{ minHeight: '100vh', maxHeight: '100vh' }}>
        <Outlet
          context={{
            projects,
            setProjects,
            addTaskToProject,
            updateTaskStatus,
            updateTask,
            deleteTask,
            updateProject,
            deleteProject,
            profile,
            updateProfile,
            theme,
          }}
        />
      </main>
    </div>
  );

}

export default Layout;
