export default function Badge({ children, color = "green" }) {
  const colors = {
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200"
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full border ${colors[color]}`}>
      {children}
    </span>
  );
}
