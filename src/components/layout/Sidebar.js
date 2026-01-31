import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  PenTool,
  History,
  Users,
  Calendar,
  FileText,
  LogOut
} from "lucide-react";

export default function Sidebar({ role }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Image
            src="/logo.png"
            alt="InternTrack Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-md"
          />
          InternTrack
        </div>
      </div>

      {/* Changed to flex-col with justify-between to push Sign Out to bottom */}
      <nav className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-1">
          {role === "intern" ? (
            <>
              <NavLink href="/intern/dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavLink href="/intern/activity" icon={PenTool} label="Log Activity" />
              <NavLink href="/intern/history" icon={History} label="History" />
            </>
          ) : (
            <>
              <NavLink href="/admin/interns" icon={Users} label="Interns" />
              <NavLink href="/admin/attendance" icon={Calendar} label="Attendance" />
              <NavLink href="/admin/activities" icon={FileText} label="Activities" />
            </>
          )}
        </div>

        {/* Sign Out Section */}
        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                       text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </nav>
    </aside>
  );
}

function NavLink({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
    >
      <Icon className="w-5 h-5 text-slate-400" />
      {label}
    </Link>
  );
}