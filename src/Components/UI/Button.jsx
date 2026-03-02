export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  onClick, 
  disabled, 
  type = "button",
  className = "",
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary: "bg-white/40 border border-sky-300 text-sky-800 hover:bg-white/60",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-sky-600 hover:text-sky-800 hover:bg-sky-50"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}