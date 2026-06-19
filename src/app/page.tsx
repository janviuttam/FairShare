import Link from "next/link";
import {
  Users,
  Wallet,
  BarChart3,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <>

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-24 md:py-36 px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              FairShare
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Split expenses effortlessly with friends,
              roommates, travel groups, and teams.
            </p>

            <p className="text-slate-400 max-w-2xl mx-auto mb-10">
              Track expenses, manage groups, calculate
              settlements, and visualize spending with
              powerful analytics — all in one place.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-cyan-400 transition"
              >
                Open Dashboard
              </Link>

              <Link
                href="/expenses"
                className="border border-slate-600 px-8 py-4 rounded-xl hover:bg-slate-800 transition"
              >
                Manage Expenses
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
              <Users className="text-cyan-400 mb-4" />

              <h3 className="text-xl font-bold mb-2">
                Group Management
              </h3>

              <p className="text-slate-400">
                Create groups and manage members
                for trips, events, and shared living.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
              <Wallet className="text-cyan-400 mb-4" />

              <h3 className="text-xl font-bold mb-2">
                Smart Expense Splitting
              </h3>

              <p className="text-slate-400">
                Split expenses among selected members
                instead of the entire group.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
              <BarChart3 className="text-cyan-400 mb-4" />

              <h3 className="text-xl font-bold mb-2">
                Analytics Dashboard
              </h3>

              <p className="text-slate-400">
                Visualize spending trends, top groups,
                and category insights.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
              <CheckCircle className="text-cyan-400 mb-4" />

              <h3 className="text-xl font-bold mb-2">
                Easy Settlements
              </h3>

              <p className="text-slate-400">
                Instantly know who owes whom and mark
                payments as completed.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Create a Group",
              "Add Members",
              "Track Expenses",
              "Settle Up",
            ].map((step, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-3xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-cyan-500 text-black font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>

                <h3 className="font-bold text-lg">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Simplify Expense Sharing?
            </h2>

            <p className="text-slate-400 mb-8">
              Start managing shared expenses with
              FairShare today.
            </p>

            <Link
              href="/dashboard"
              className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-cyan-400 transition"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
          © FairShare · Split expenses effortlessly.
        </footer>

      </main>
    </>
  );
}