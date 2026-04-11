export default function Card({ children, className = "", hover = false }) {
  return (
    <div className={`bg-white/70 backdrop-blur-md border border-sky-100 rounded-2xl p-6 shadow-md overflow-hidden ${hover ? 'hover:shadow-xl transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
}