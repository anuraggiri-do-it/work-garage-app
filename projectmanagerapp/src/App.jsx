import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Projects from "./Pages/Projects.jsx";
import Tasks from "./Pages/Tasks.jsx";
import Settings from "./Pages/Settings.jsx";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
