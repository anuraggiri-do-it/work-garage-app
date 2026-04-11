import ProgressBarUI from "./UI/ProgressBar";

export default function ProgressBar({ progress, completedTasks, totalTasks }) {
  return (
    <div className="mb-4">
      <ProgressBarUI progress={progress} />
      <div className="flex justify-between mt-2 text-sm text-sky-700 font-semibold">
        <span>{progress}% Complete</span>
        <span>{completedTasks}/{totalTasks} tasks</span>
      </div>
    </div>
  );
}