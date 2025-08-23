export default function Input({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = "",
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sky-700 font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 bg-white"
        {...props}
      />
    </div>
  );
}