
import { prisma } from "@/lib/prisma";
import { markSettlementPaid } from "@/actions/settlementActions";
import { HandCoins, History } from "lucide-react";

export default async function SettlementsPage() {
  const groups = await prisma.group.findMany({
    include: {
      expenses: {
        include: {
          paidBy: true,
          participants: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  const paidSettlements =
    await prisma.settlement.findMany({
      where: {
        isPaid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const users = await prisma.user.findMany();

  const userMap: Record<string, string> = {};

  users.forEach((user) => {
    userMap[user.id] = user.name;
  });

  const groupSettlements = groups.map((group) => {
    const balances: Record<string, number> = {};
    const names: Record<string, string> = {};

    group.expenses.forEach((expense) => {
      const participants = expense.participants;

      if (participants.length === 0) return;

      const share =
        expense.amount / participants.length;

      names[expense.paidBy.id] =
        expense.paidBy.name;

      balances[expense.paidBy.id] =
        (balances[expense.paidBy.id] || 0) +
        expense.amount;

      participants.forEach((participant) => {
        names[participant.user.id] =
          participant.user.name;

        balances[participant.user.id] =
          (balances[participant.user.id] || 0) -
          share;
      });
    });

    const debtors: {
      userId: string;
      amount: number;
    }[] = [];

    const creditors: {
      userId: string;
      amount: number;
    }[] = [];

    for (const userId in balances) {
      const amount = balances[userId];

      if (amount > 0) {
        creditors.push({
          userId,
          amount,
        });
      } else if (amount < 0) {
        debtors.push({
          userId,
          amount: Math.abs(amount),
        });
      }
    }

    const settlements: {
      from: string;
      to: string;
      fromUserId: string;
      toUserId: string;
      amount: number;
    }[] = [];

    let i = 0;
    let j = 0;

    while (
      i < debtors.length &&
      j < creditors.length
    ) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      const amount = Math.min(
        debtor.amount,
        creditor.amount
      );

      const alreadyPaid =
        paidSettlements.some(
          (paid) =>
            paid.fromUserId === debtor.userId &&
            paid.toUserId === creditor.userId &&
            Math.abs(paid.amount - amount) < 0.01
        );

      if (!alreadyPaid) {
        settlements.push({
          from: names[debtor.userId],
          to: names[creditor.userId],
          fromUserId: debtor.userId,
          toUserId: creditor.userId,
          amount,
        });
      }

      debtor.amount -= amount;
      creditor.amount -= amount;

      if (debtor.amount === 0) i++;
      if (creditor.amount === 0) j++;
    }

    return {
      groupName: group.name,
      settlements,
    };
  });

  const totalPendingSettlements =
    groupSettlements.reduce(
      (total, group) =>
        total + group.settlements.length,
      0
    );

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">
        Settlements
      </h1>

      {/* Pending Settlements */}

      {totalPendingSettlements === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center">
          <div className="flex justify-center mb-4">
            <HandCoins
              size={64}
              className="text-green-400"
            />
          </div>

          <h2 className="text-3xl font-bold mb-3">
            Everyone is settled up 🎉
          </h2>

          <p className="text-slate-400">
            No pending payments found.
          </p>
        </div>
      ) : (
        groupSettlements.map((group) => (
          <div
            key={group.groupName}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-cyan-400 mb-5">
              {group.groupName}
            </h2>

            {group.settlements.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-5">
                No settlements needed
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.settlements.map(
                  (settlement, index) => (
                    <div
                      key={index}
                      className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg hover:border-green-500 transition"
                    >
                      <h2 className="text-xl font-bold text-cyan-400">
                        {settlement.from}
                      </h2>

                      <p className="my-3 text-slate-400">
                        owes
                      </p>

                      <h2 className="text-xl font-bold text-green-400">
                        {settlement.to}
                      </h2>

                      <p className="mt-4 text-3xl font-bold">
                        ₹
                        {settlement.amount.toFixed(
                          2
                        )}
                      </p>

                      <form action={markSettlementPaid}>
                        <input
                          type="hidden"
                          name="fromUserId"
                          value={
                            settlement.fromUserId
                          }
                        />

                        <input
                          type="hidden"
                          name="toUserId"
                          value={
                            settlement.toUserId
                          }
                        />

                        <input
                          type="hidden"
                          name="amount"
                          value={
                            settlement.amount
                          }
                        />

                        <button
                          type="submit"
                          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition"
                        >
                          Mark as Paid
                        </button>
                      </form>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))
      )}

      {/* Settlement History */}

      {/* Settlement History */}

      {groups.length > 0 &&
        paidSettlements.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <History className="text-cyan-400" />

              <h2 className="text-4xl font-bold text-cyan-400">
                Settlement History
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paidSettlements.map(
                (settlement) => (
                  <div
                    key={settlement.id}
                    className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
                  >
                    <h3 className="text-green-400 font-bold text-xl">
                      {
                        userMap[
                          settlement.fromUserId
                        ]
                      }
                    </h3>

                    <p className="my-2 text-slate-400">
                      paid
                    </p>

                    <h3 className="text-cyan-400 font-bold text-xl">
                      {
                        userMap[
                          settlement.toUserId
                        ]
                      }
                    </h3>

                    <p className="text-2xl font-bold mt-4">
                      ₹
                      {settlement.amount.toFixed(
                        2
                      )}
                    </p>

                    <p className="text-sm text-slate-400 mt-3">
                      {new Date(
                        settlement.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
      )}
    </div>
  );
}