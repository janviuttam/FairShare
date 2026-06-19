import { prisma } from "@/lib/prisma";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import { Wallet } from "lucide-react";

export default async function ExpensesPage() {
  const users = await prisma.user.findMany();

  const groups = await prisma.group.findMany({
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  const expenses = await prisma.expense.findMany({
    include: {
      paidBy: true,
      group: true,
      participants: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const groupNames = [
    ...new Set(
      expenses.map(
        (expense) => expense.group.name
      )
    ),
  ];

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">
        Expenses
      </h1>

      {/* Create Expense */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 w-full max-w-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Create Expense
        </h2>

        <ExpenseForm
          users={users}
          groups={groups}
        />
      </div>

      {/* Empty State */}
      {expenses.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center">
          <div className="flex justify-center mb-4">
            <Wallet
              size={64}
              className="text-cyan-400"
            />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            No Expenses Found
          </h2>

          <p className="text-slate-400">
            Create your first expense to start
            tracking shared spending.
          </p>
        </div>
      ) : (
        <ExpenseList
          expenses={expenses}
          groups={groupNames}
        />
      )}
    </div>
  );
}