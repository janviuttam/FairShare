import { prisma } from "@/lib/prisma";
import { IndianRupee } from "lucide-react";

export default async function SettlementsPage() {
  const groups = await prisma.group.findMany({
    include: {
      members: {
        include: {
          user: true,
        },
      },
      expenses: {
        include: {
          paidBy: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-5xl font-bold mb-8">
        Settlements
      </h1>

      {groups.map((group) => {
        const totalExpense = group.expenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

        const memberCount = group.members.length;

        const share =
          memberCount > 0
            ? totalExpense / memberCount
            : 0;

        const balances: Record<string, number> = {};

        group.members.forEach((member) => {
          balances[member.user.name] = -share;
        });

        group.expenses.forEach((expense) => {
          balances[expense.paidBy.name] += expense.amount;
        });

        const creditors = Object.entries(balances)
          .filter(([_, balance]) => balance > 0);

        const debtors = Object.entries(balances)
          .filter(([_, balance]) => balance < 0);

        return (
          <div
            key={group.id}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">
              {group.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">

              <div className="bg-slate-900 p-4 rounded-xl">
                <p className="text-slate-400">
                  Total Expense
                </p>
                <p className="text-2xl font-bold text-cyan-400">
                  ₹{totalExpense}
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl">
                <p className="text-slate-400">
                  Members
                </p>
                <p className="text-2xl font-bold">
                  {memberCount}
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl">
                <p className="text-slate-400">
                  Share Per Person
                </p>
                <p className="text-2xl font-bold">
                  ₹{share}
                </p>
              </div>

            </div>

            <div className="mb-6">
              <h3 className="font-bold text-xl mb-3">
                Balances
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                {Object.entries(balances).map(
                  ([name, balance]) => (
                    <div
                      key={name}
                      className={`p-4 rounded-xl ${
                        balance >= 0
                          ? "bg-green-500/10 border border-green-500/30"
                          : "bg-red-500/10 border border-red-500/30"
                      }`}
                    >
                      <p className="font-semibold">
                        {name}
                      </p>

                      <p
                        className={
                          balance >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        ₹{balance}
                      </p>
                    </div>
                  )
                )}

              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-3">
                Settlements
              </h3>

              <div className="space-y-3">

                {debtors.map(([debtor, debt]) =>
                  creditors.map(([creditor, credit]) => {
                    const amount = Math.min(
                      Math.abs(debt),
                      credit
                    );

                    if (amount <= 0) return null;

                    return (
                      <div
                        key={`${debtor}-${creditor}`}
                        className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2">
                          <IndianRupee className="text-cyan-400" />

                          <p>
                            <span className="text-red-400 font-semibold">
                              {debtor}
                            </span>{" "}
                            owes{" "}
                            <span className="text-green-400 font-semibold">
                              {creditor}
                            </span>{" "}
                            ₹{amount}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}