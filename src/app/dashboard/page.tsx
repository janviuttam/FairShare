import { prisma } from "@/lib/prisma";
import {
  Users,
  UsersRound,
  Wallet,
  IndianRupee,
} from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const usersCount = await prisma.user.count();

  const groupsCount = await prisma.group.count();

  const membersCount = await prisma.groupMember.count();

  const expensesCount = await prisma.expense.count();

  const totalExpenseResult = await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
  });

  const totalExpense =
    totalExpenseResult._sum.amount || 0;

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <h1 className="text-5xl font-bold mb-10 text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Users */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-cyan-400" />
            <h2 className="text-xl font-bold text-white">
              Users
            </h2>
          </div>

          <p className="text-4xl mt-2 font-bold text-cyan-400">
            {usersCount}
          </p>
        </div>

        {/* Groups */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <UsersRound className="text-cyan-400" />
            <h2 className="text-xl font-bold text-white">
              Groups
            </h2>
          </div>

          <p className="text-4xl mt-2 font-bold text-cyan-400">
            {groupsCount}
          </p>
        </div>

        {/* Members */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-cyan-400" />
            <h2 className="text-xl font-bold text-white">
              Members
            </h2>
          </div>

          <p className="text-4xl mt-2 font-bold text-cyan-400">
            {membersCount}
          </p>
        </div>

        {/* Expenses */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="text-cyan-400" />
            <h2 className="text-xl font-bold text-white">
              Expenses
            </h2>
          </div>

          <p className="text-4xl mt-2 font-bold text-cyan-400">
            {expensesCount}
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <IndianRupee className="text-cyan-400" />
            <h2 className="text-xl font-bold text-white">
              Total Spent
            </h2>
          </div>

          <p className="text-4xl mt-2 font-bold text-cyan-400">
            ₹{totalExpense}
          </p>
        </div>

      </div>
    </div>
  );
}