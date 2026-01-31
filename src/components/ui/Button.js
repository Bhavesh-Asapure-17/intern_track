export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium transition
                  bg-indigo-600 text-white hover:bg-indigo-700
                  disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
