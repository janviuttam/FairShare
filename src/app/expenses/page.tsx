import { prisma } from "@/lib/prisma";
import {
  createExpense,
  deleteExpense,
} from "@/actions/expenseActions";
import { Wallet } from "lucide-react";

export default async function ExpensesPage() {
  const users = await prisma.user.findMany();

  const groups = await prisma.group.findMany();

  const expenses = await prisma.expense.findMany({
    include: {
      paidBy: true,
      group: true,
    },
  });

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-5xl font-bold mb-8">
        Expenses
      </h1>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 max-w-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Create Expense
        </h2>

        <form action={createExpense} className="space-y-4">

          <input
            name="description"
            placeholder="Expense Description"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          />

          <input
            name="amount"
            placeholder="Amount"
            type="number"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          />

          <select
            name="paidById"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            name="groupId"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
          >
            Create Expense
          </button>

        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg hover:scale-105 hover:border-cyan-500 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="text-cyan-400" />

              <h2 className="font-bold text-xl">
                {expense.description}
              </h2>
            </div>

            <p className="text-3xl font-bold text-cyan-400 mb-3">
              ₹{expense.amount}
            </p>

            <p className="text-slate-300">
              Paid By:
              <span className="text-white ml-2">
                {expense.paidBy.name}
              </span>
            </p>

            <p className="text-slate-300 mt-2">
              Group:
              <span className="ml-2 px-2 py-1 rounded bg-cyan-500/20 text-cyan-400">
                {expense.group.name}
              </span>
            </p>

            <form action={deleteExpense} className="mt-5">
              <input
                type="hidden"
                name="id"
                value={expense.id}
              />

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition"
              >
                Delete Expense
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}