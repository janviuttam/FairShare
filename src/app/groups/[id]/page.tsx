import Breadcrumb from "@/components/Breadcrumb";
import { prisma } from "@/lib/prisma";
import {
  Users,
  Wallet,
  IndianRupee,
} from "lucide-react";
import { notFound } from "next/navigation";

export default async function GroupDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const group = await prisma.group.findUnique({
    where: {
      id,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
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

  if (!group) {
    notFound();
  }

  const totalSpent = group.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // =====================
  // Settlement Calculation
  // =====================

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

    settlements.push({
      from: names[debtor.userId],
      to: names[creditor.userId],
      amount,
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <Breadcrumb
        items={[
          {
            label: "Groups",
            href: "/groups",
          },
          {
            label: group.name,
          },
        ]}
      />
      <h1 className="text-5xl font-bold mb-10">
        {group.name}
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <Users className="text-cyan-400 mb-3" />

          <h2 className="text-2xl font-bold">
            Members
          </h2>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {group.members.length}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <Wallet className="text-cyan-400 mb-3" />

          <h2 className="text-2xl font-bold">
            Expenses
          </h2>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {group.expenses.length}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <IndianRupee className="text-cyan-400 mb-3" />

          <h2 className="text-2xl font-bold">
            Total Spent
          </h2>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            ₹{totalSpent}
          </p>
        </div>
      </div>

      {/* Members + Expenses */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <h2 className="text-3xl font-bold mb-5">
            Members
          </h2>

          <div className="space-y-4">
            {group.members.map((member) => (
              <div
                key={member.id}
                className="bg-slate-900 p-4 rounded-xl"
              >
                {member.user.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <h2 className="text-3xl font-bold mb-5">
            Expenses
          </h2>

          <div className="space-y-4">
            {group.expenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-slate-900 p-4 rounded-xl"
              >
                <h3 className="text-xl font-bold">
                  {expense.description}
                </h3>

                <p className="text-cyan-400 text-lg">
                  ₹{expense.amount}
                </p>

                <p className="text-slate-300">
                  Paid by {expense.paidBy.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settlements */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 mt-8">
        <h2 className="text-3xl font-bold mb-5">
          Settlements
        </h2>

        {settlements.length === 0 ? (
          <div className="bg-slate-900 p-4 rounded-xl">
            Everyone is settled up 🎉
          </div>
        ) : (
          <div className="space-y-4">
            {settlements.map(
              (settlement, index) => (
                <div
                  key={index}
                  className="bg-slate-900 p-5 rounded-xl"
                >
                  <p className="text-lg">
                    <span className="text-cyan-400 font-bold">
                      {settlement.from}
                    </span>{" "}
                    owes{" "}
                    <span className="text-green-400 font-bold">
                      {settlement.to}
                    </span>
                  </p>

                  <p className="text-3xl font-bold mt-3">
                    ₹
                    {settlement.amount.toFixed(
                      2
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}