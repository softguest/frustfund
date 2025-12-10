"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardHeader() {
    const { user } = useUser();
  return (
    <header className="flex justify-between items-center p-4 border-b border-muted bg-secondary">
      <h1 className="text-2xl font-bold text-text">Banking Dashboard</h1>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="Search..." className="border px-3 py-1 rounded" />
        {!user ?
            <Link href="/sign-in">
                <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    Login
                </button>
            </Link> :
            <div className="hidden md:block">
                <div className="flex items-center gap-5  border border-red-600 rounded-full">
                    <UserButton />
                </div>
            </div>
        }
        <span className="text-sm font-bold">{user?.firstName} {user?.lastName}</span>
        <div className="w-6 h-6 bg-muted rounded-full" />
      </div>
    </header>
  );
}
