"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400"
        >
          FairShare
        </Link>

        <div className="flex items-center gap-6 text-slate-300">

          <Link href="/dashboard" className="hover:text-cyan-400">
            Dashboard
          </Link>

          <Link href="/users" className="hover:text-cyan-400">
            Users
          </Link>

          <Link href="/groups" className="hover:text-cyan-400">
            Groups
          </Link>

          <Link href="/members" className="hover:text-cyan-400">
            Members
          </Link>

          <Link href="/expenses" className="hover:text-cyan-400">
            Expenses
          </Link>

          <Link href="/settlements" className="hover:text-cyan-400">
            Settlements
          </Link>

          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-lg border border-slate-700">
              Login
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold">
              Sign Up
            </button>
          </SignUpButton>

          <UserButton />

        </div>
      </div>
    </nav>
  );
}