import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-6">
      <h1 className="text-8xl font-bold text-cyan-400">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4 mb-2">
        Page Not Found
      </h2>

      <p className="text-slate-400 text-center max-w-md mb-8">
        The page you're looking for doesn't exist
        or may have been moved.
      </p>

      <Link
        href="/dashboard"
        className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition"
      >
        Go To Dashboard
      </Link>
    </div>
  );
}