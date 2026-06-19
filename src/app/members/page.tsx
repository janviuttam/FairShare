import { prisma } from "@/lib/prisma";
import {
  createMember,
  deleteMember,
} from "@/actions/memberActions";

import { UserPlus } from "lucide-react";

export default async function MembersPage() {
  const users = await prisma.user.findMany();

  const groups = await prisma.group.findMany();

  const members = await prisma.groupMember.findMany({
    include: {
      user: true,
      group: true,
    },
  });
  console.log("USERS", users);
  console.log("GROUPS", groups);
  console.log("MEMBERS", members);
  
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-5xl font-bold mb-8">
        Group Members
      </h1>

      {/* Add Member */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Add Member
        </h2>

        <form
          action={createMember}
          className="space-y-4"
        >
          <select
            name="userId"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          >
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <select
            name="groupId"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
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

          <button
            type="submit"
            className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
          >
            Add Member
          </button>
        </form>
      </div>

      {/* Members List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg hover:scale-105 hover:border-cyan-500 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <UserPlus className="text-cyan-400" />

              <h2 className="font-bold text-lg">
                {member.user.name}
              </h2>
            </div>

            <p className="text-slate-300 mb-4">
              Member of{" "}
              <span className="text-cyan-400">
                {member.group.name}
              </span>
            </p>

            <form
              action={async () => {
                "use server";
                await deleteMember(member.id);
              }}
            >
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white transition"
              >
                Remove Member
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}