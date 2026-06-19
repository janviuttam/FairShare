import { prisma } from "@/lib/prisma";
import {
  createUser,
  updateUser,
  deleteUser,
} from "@/actions/userActions";

import { User } from "lucide-react";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">
        Users
      </h1>

      {/* Create User */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Create User
        </h2>

        <form action={createUser} className="space-y-4">
          <input
            name="name"
            placeholder="Enter name"
            required
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
          />

          <input
            name="email"
            placeholder="Enter email"
            required
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

      {/* Users List */}
      {users.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center">
          <div className="text-6xl mb-4">
            👤
          </div>

          <h2 className="text-2xl font-bold mb-2">
            No Users Found
          </h2>

          <p className="text-slate-400">
            Create your first user to get started.
          </p>
        </div>
      ) : (
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

              <p className="text-slate-300 mb-4">
                {user.email}
              </p>

              {/* Update User */}
              <form
                action={updateUser}
                className="space-y-3 mb-4"
              >
                <input
                  type="hidden"
                  name="id"
                  value={user.id}
                />

                <input
                  name="name"
                  defaultValue={user.name}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700"
                />

                <input
                  name="email"
                  defaultValue={user.email}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700"
                />

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-lg"
                >
                  Update User
                </button>
              </form>

              {/* Delete User */}
              <form
                action={async () => {
                  "use server";
                  await deleteUser(user.id);
                }}
              >
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white"
                >
                  Delete User
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}