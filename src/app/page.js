import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-slate-200 p-8">

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl overflow-hidden">
            <Image
              src="/logo.png"   
              alt="Intern Track Logo"
              width={56}
              height={56}
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-slate-900">
          Intern Track
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Select a role to continue
        </p>

        <Link
          href="/intern/dashboard"
          className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors mb-4"
        >
          Login as Intern
        </Link>

        <Link
          href="/admin/interns"
          className="block w-full text-center border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Login as Admin
        </Link>

      </div>
    </main>
  );
}
