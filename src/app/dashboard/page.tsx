import DashboardCharts from "@/components/DashboardCharts";
import { prisma } from "@/lib/prisma";
import {
  Users,
  UsersRound,
  Wallet,
  IndianRupee,
  Trophy,
  Crown,
  Tag,
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

  const membersCount =
    await prisma.groupMember.count();

  const expenses =
    await prisma.expense.findMany({
      include: {
        paidBy: true,
        group: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const recentExpenses =
    expenses.slice(0, 5);

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // User Analytics

  const userSpending: Record<string, number> =
    {};

  expenses.forEach((expense) => {
    userSpending[expense.paidBy.name] =
      (userSpending[expense.paidBy.name] || 0) +
      expense.amount;
  });

  let mostActiveUser = "N/A";
  let highestUserExpense = 0;

  Object.entries(userSpending).forEach(
    ([name, amount]) => {
      if (amount > highestUserExpense) {
        highestUserExpense = amount;
        mostActiveUser = name;
      }
    }
  );

  // Group Analytics

  const groupSpending: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {
    groupSpending[expense.group.name] =
      (groupSpending[expense.group.name] || 0) +
      expense.amount;
  });

  let mostExpensiveGroup = "N/A";
  let highestGroupExpense = 0;

  Object.entries(groupSpending).forEach(
    ([name, amount]) => {
      if (amount > highestGroupExpense) {
        highestGroupExpense = amount;
        mostExpensiveGroup = name;
      }
    }
  );

  // Category Analytics

  const categorySpending: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {
    categorySpending[expense.category] =
      (categorySpending[expense.category] || 0) +
      expense.amount;
  });

  let topCategory = "N/A";
  let highestCategoryAmount = 0;

  Object.entries(categorySpending).forEach(
    ([category, amount]) => {
      if (amount > highestCategoryAmount) {
        highestCategoryAmount = amount;
        topCategory = category;
      }
    }
  );

  const userData = Object.entries(
    userSpending
  ).map(([name, amount]) => ({
    name,
    amount,
  }));

  const groupData = Object.entries(
    groupSpending
  ).map(([name, amount]) => ({
    name,
    amount,
  }));

  const cards = [
    {
      title: "Users",
      value: usersCount,
      icon: Users,
    },
    {
      title: "Groups",
      value: groupsCount,
      icon: UsersRound,
    },
    {
      title: "Members",
      value: membersCount,
      icon: Users,
    },
    {
      title: "Expenses",
      value: expenses.length,
      icon: Wallet,
    },
    {
      title: "Total Spent",
      value: `₹${totalExpense}`,
      icon: IndianRupee,
    },
    {
      title: "Most Active User",
      value: mostActiveUser,
      icon: Trophy,
    },
    {
      title: "Top Group",
      value: mostExpensiveGroup,
      icon: Crown,
    },
    {
      title: "Top Category",
      value: topCategory,
      icon: Tag,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-white">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="text-cyan-400" />

                <h2 className="text-xl font-bold text-white">
                  {card.title}
                </h2>
              </div>

              <p className="text-3xl font-bold text-cyan-400">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <DashboardCharts
        userData={userData}
        groupData={groupData}
      />

      <div className="mt-10 bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-5">
          Category Breakdown
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categorySpending).map(
            ([category, amount]) => (
              <div
                key={category}
                className="bg-slate-900 p-4 rounded-xl"
              >
                <h3 className="text-cyan-400 font-bold">
                  {category}
                </h3>

                <p className="text-2xl font-bold mt-2 text-white">
                  ₹{amount}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-10 bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-slate-900 p-4 rounded-xl"
            >
              <p className="font-semibold text-white">
                {expense.description}
              </p>

              <p className="text-cyan-400">
                ₹{expense.amount}
              </p>

              <p className="text-sm text-slate-400">
                {expense.category} •{" "}
                {expense.group.name}
              </p>

              <p className="text-sm text-slate-500">
                Paid by {expense.paidBy.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}