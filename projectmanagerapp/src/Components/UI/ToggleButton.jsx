import { Moon, Sun } from "lucide-react";

export default function ToggleButton({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-5 py-3 bg-sky-100 text-sky-700 rounded-xl hover:bg-sky-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 text-base font-semibold w-full sm:w-auto"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{ minWidth: 120, maxWidth: 220 }}
    >
      {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}
