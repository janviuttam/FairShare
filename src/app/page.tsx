import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <section className="flex flex-col items-center justify-center text-center py-32 px-6">
          <h1 className="text-7xl font-extrabold mb-6">
            FairShare
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mb-10">
            Split expenses with friends, roommates, and travel groups
            without awkward calculations.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/dashboard"
              className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              Open Dashboard
            </Link>

            <Link
              href="/expenses"
              className="border border-slate-600 px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Manage Expenses
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2">
                Create Groups
              </h3>
              <p className="text-slate-400">
                Organize trips, events, and shared expenses.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2">
                Track Expenses
              </h3>
              <p className="text-slate-400">
                Record who paid and where the money went.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2">
                Easy Settlements
              </h3>
              <p className="text-slate-400">
                Instantly know who owes whom and how much.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}