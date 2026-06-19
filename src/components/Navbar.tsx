"use client";

import Link from "next/link";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="w-full px-6 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400"
        >
          FairShare
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-slate-300">

          <Link
            href="/dashboard"
            className="hover:text-cyan-400"
          >
            Dashboard
          </Link>

          <Link
            href="/users"
            className="hover:text-cyan-400"
          >
            Users
          </Link>

          <Link
            href="/groups"
            className="hover:text-cyan-400"
          >
            Groups
          </Link>

          <Link
            href="/members"
            className="hover:text-cyan-400"
          >
            Members
          </Link>

          <Link
            href="/expenses"
            className="hover:text-cyan-400"
          >
            Expenses
          </Link>

          <Link
            href="/settlements"
            className="hover:text-cyan-400"
          >
            Settlements
          </Link>

          {!isSignedIn ? (
            <>
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
            </>
          ) : (
            <UserButton />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 flex flex-col gap-4 text-slate-300">

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href="/users"
            onClick={() => setOpen(false)}
          >
            Users
          </Link>

          <Link
            href="/groups"
            onClick={() => setOpen(false)}
          >
            Groups
          </Link>

          <Link
            href="/members"
            onClick={() => setOpen(false)}
          >
            Members
          </Link>

          <Link
            href="/expenses"
            onClick={() => setOpen(false)}
          >
            Expenses
          </Link>

          <Link
            href="/settlements"
            onClick={() => setOpen(false)}
          >
            Settlements
          </Link>

          {!isSignedIn ? (
            <div className="flex gap-3 pt-2">
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
            </div>
          ) : (
            <div className="pt-2">
              <UserButton />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}