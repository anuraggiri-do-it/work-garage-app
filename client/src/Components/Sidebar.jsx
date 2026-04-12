import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  ListTodo,
  Settings,
} from "lucide-react";
import ToggleButton from "./UI/ToggleButton";

export default function Sidebar({ theme, profile, navItems, onToggleTheme }) {
  return (
    <aside className={`w-64 h-screen flex flex-col justify-between ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-700' : 'bg-gradient-to-br from-blue-100 to-blue-50'} p-4 lg:p-6`}>
      {/* Top: App name + Navigation */}
      <div>
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'} mb-8`}>
          Project Manager
        </h1>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 
                  ${
                    isActive
                      ? theme === 'dark' 
                        ? "bg-blue-600 text-white font-semibold shadow-md"
                        : "bg-blue-300 text-blue-900 font-semibold shadow-md"
                      : theme === 'dark'
                        ? "text-blue-200 hover:bg-slate-600"
                        : "text-blue-700 hover:bg-blue-200"
                  }`
                }
              >
                <span className={`p-2 ${theme === 'dark' ? 'bg-slate-600' : 'bg-white'} rounded-md shadow-md`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
 
      </div>
      {/* Bottom: Profile Section */}
      <div className={`border-t ${theme === 'dark' ? 'border-slate-600' : 'border-blue-200'} pt-4 mt-6`}>
        <div className={`flex items-center gap-3 ${theme === 'dark' ? 'hover:bg-slate-600' : 'hover:bg-blue-200'} rounded-lg p-3 transition-all duration-300 cursor-pointer`}>
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-md object-cover"
          />
          <div>
            <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>{profile.name}</p>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{profile.email}</p>
            {profile.title && <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>{profile.title}</p>}
          </div>
        </div>
      </div>
    </aside>
  );

}
