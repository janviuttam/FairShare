export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="flex flex-col items-center gap-6">
        
        <div className="h-16 w-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />

        <h1 className="text-3xl font-bold text-white">
          FairShare
        </h1>

        <p className="text-slate-400">
          Loading...
        </p>

      </div>
    </div>
  );
}