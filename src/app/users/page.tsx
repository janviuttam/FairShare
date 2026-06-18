import { prisma } from "@/lib/prisma";
import {
  createUser,
  deleteUser,
} from "@/actions/userActions";
import { User } from "lucide-react";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-5xl font-bold mb-8">
        Users
      </h1>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Create User
        </h2>

        <form action={createUser} className="space-y-4">
          <input
            name="name"
            placeholder="Enter name"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          />

          <input
            name="email"
            placeholder="Enter email"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          />

          <button
            type="submit"
            className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
          >
            Create User
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg hover:scale-105 hover:border-cyan-500 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <User className="text-cyan-400" />

              <h2 className="font-bold text-xl text-white">
                {user.name}
              </h2>
            </div>

            <p className="text-slate-300">
              {user.email}
            </p>
            <form action={deleteUser}>
              <input
                type="hidden"
                name="id"
                value={user.id}
              />

              <button
                type="submit"
                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}