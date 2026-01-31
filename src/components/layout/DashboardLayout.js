import Sidebar from "./Sidebar";

export default function DashboardLayout(props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={props.role} />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          {props.children}
        </div>
      </main>
    </div>
  );
}
