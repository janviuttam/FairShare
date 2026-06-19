"use client";

import { useState } from "react";
import { createExpense } from "@/actions/expenseActions";

type User = {
  id: string;
  name: string;
};

type Group = {
  id: string;
  name: string;
  members: {
    id: string;
    user: {
      id: string;
      name: string;
    };
  }[];
};

export default function ExpenseForm({
  users,
  groups,
}: {
  users: User[];
  groups: Group[];
}) {
  const [selectedGroupId, setSelectedGroupId] =
    useState(groups[0]?.id || "");

  const selectedGroup = groups.find(
    (group) => group.id === selectedGroupId
  );

  return (
    <form action={createExpense} className="space-y-4">
      <input
        name="description"
        placeholder="Expense Description"
        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
      />

      <select
        name="category"
        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Hotel">Hotel</option>
        <option value="Fuel">Fuel</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">
          Entertainment
        </option>
        <option value="Other">Other</option>
      </select>

      <select
        name="paidById"
        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <select
        name="groupId"
        value={selectedGroupId}
        onChange={(e) =>
          setSelectedGroupId(e.target.value)
        }
        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
      >
        {groups.map((group) => (
          <option
            key={group.id}
            value={group.id}
          >
            {group.name}
          </option>
        ))}
      </select>

      <div>
        <h3 className="font-bold mb-2">
          Split Between
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {selectedGroup?.members.map(
            (member) => (
              <label
                key={member.id}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="participantIds"
                  value={member.user.id}
                />

                {member.user.name}
              </label>
            )
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
      >
        Create Expense
      </button>
    </form>
  );
}