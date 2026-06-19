
"use client";

import { useMemo, useState } from "react";
import { Wallet, Pencil, X } from "lucide-react";
import {
  deleteExpense,
  updateExpense,
} from "@/actions/expenseActions";

type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  paidBy: {
    name: string;
  };
  group: {
    name: string;
  };
  participants: {
    id: string;
    user: {
      name: string;
    };
  }[];
};

export default function ExpenseList({
  expenses,
  groups,
}: {
  expenses: Expense[];
  groups: string[];
}) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [group, setGroup] =
    useState("All");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        expense.category === category;

      const matchesGroup =
        group === "All" ||
        expense.group.name === group;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGroup
      );
    });
  }, [
    expenses,
    search,
    category,
    group,
  ]);

  const categories = [
    "All",
    ...new Set(
      expenses.map(
        (expense) => expense.category
      )
    ),
  ];

  return (
    <>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Search & Filters
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Search Expense..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="p-3 rounded-lg bg-slate-900 border border-slate-700"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="p-3 rounded-lg bg-slate-900 border border-slate-700"
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

          <select
            value={group}
            onChange={(e) =>
              setGroup(
                e.target.value
              )
            }
            className="p-3 rounded-lg bg-slate-900 border border-slate-700"
          >
            <option value="All">
              All Groups
            </option>

            {groups.map((group) => (
              <option
                key={group}
                value={group}
              >
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExpenses.map(
          (expense) => (
            <div
              key={expense.id}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg"
            >
              {editingId === expense.id ? (
                <form
                  action={updateExpense}
                  className="space-y-3"
                >
                  <input
                    type="hidden"
                    name="id"
                    value={expense.id}
                  />

                  <input
                    name="description"
                    defaultValue={
                      expense.description
                    }
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700"
                  />

                  <input
                    name="amount"
                    type="number"
                    defaultValue={
                      expense.amount
                    }
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700"
                  />

                  <input
                    name="category"
                    defaultValue={
                      expense.category
                    }
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700"
                  />

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-xl"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingId(
                          null
                        )
                      }
                      className="bg-slate-600 hover:bg-slate-500 px-4 rounded-xl"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <Wallet className="text-cyan-400" />

                    <h2 className="font-bold text-xl">
                      {
                        expense.description
                      }
                    </h2>
                  </div>

                  <p className="text-3xl font-bold text-cyan-400">
                    ₹{expense.amount}
                  </p>

                  <div className="mt-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                      {expense.category}
                    </span>
                  </div>

                  <p>
                    Paid By:{" "}
                    {
                      expense.paidBy.name
                    }
                  </p>

                  <p>
                    Group:{" "}
                    {
                      expense.group.name
                    }
                  </p>

                  <div className="mt-3">
                    <p className="font-semibold">
                      Split Between:
                    </p>

                    {expense.participants.map(
                      (p) => (
                        <p key={p.id}>
                          •{" "}
                          {
                            p.user.name
                          }
                        </p>
                      )
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        setEditingId(
                          expense.id
                        )
                      }
                      className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <form
                      action={
                        deleteExpense
                      }
                      className="flex-1"
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={
                          expense.id
                        }
                      />

                      <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-xl transition"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}

