export default function ProgressBar({ progress, showLabel = true, className = "" }) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm text-sky-700 font-semibold">
          <span>{progress}% Complete</span>
        </div>
      )}
      <div className="w-full bg-sky-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-sky-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}