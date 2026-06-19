import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  createGroup,
  deleteGroup,
} from "@/actions/groupActions";
import { UsersRound } from "lucide-react";

export default async function GroupsPage() {
  const groups = await prisma.group.findMany();

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">
        Groups
      </h1>

      {/* Create Group */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Create Group
        </h2>

        <form action={createGroup} className="space-y-4">
          <input
            name="name"
            placeholder="Group Name"
            required
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          />

          <button
            type="submit"
            className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
          >
            Create Group
          </button>
        </form>
      </div>

      {/* Empty State */}
      {groups.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center">
          <div className="flex justify-center mb-4">
            <UsersRound
              size={64}
              className="text-cyan-400"
            />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            No Groups Found
          </h2>

          <p className="text-slate-400">
            Create your first group to start tracking expenses.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 transition-all duration-300"
            >
              <Link href={`/groups/${group.id}`}>
                <div className="cursor-pointer">
                  <h2 className="text-2xl font-bold text-white mb-4 hover:text-cyan-400 transition">
                    {group.name}
                  </h2>
                </div>
              </Link>

              <form action={deleteGroup}>
                <input
                  type="hidden"
                  name="id"
                  value={group.id}
                />

                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}