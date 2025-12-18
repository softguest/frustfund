'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TopThreeGroups from "@/components/TopThreeGroups";

interface Group {
  id: string;
  name: string;
  description?: string;
  isMember?: boolean;
  memberCount: number;
}

export default function AllTopGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/groups/top-three")
      .then(res => res.json())
      .then(setGroups);
  }, []);

  return (
    <div className="pb-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Top Groups
        </h1>
        <Link href="/dashboard/groups/create">
          <Button
            variant="destructive"
            className="text-white bg-red-600 hover:bg-red-700 shadow-md transition-all"
          >
            Create Group
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search groups..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="
            w-full rounded-2xl border border-white/20 bg-white/30 
            backdrop-blur-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            focus:outline-none focus:ring-2 focus:ring-red-500 transition
          "
        />
      </div>

      {/* Top Groups List */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {groups.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-10">
            No top groups available.
          </p>
        ) : (
          groups.map(group => (
            <div
              key={group.id}
              className="
                relative flex flex-col justify-between w-full rounded-2xl
                border border-white/20 bg-white/30 backdrop-blur-xl
                p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
              "
            >
              {/* Glow overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <h2 className="text-lg font-bold text-gray-800">{group.name}</h2>
                {group.description && (
                  <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {group.memberCount} member{group.memberCount !== 1 ? 's' : ''}
                </p>
                {group.isMember ? (
                  <span className="mt-2 inline-block text-sm font-medium text-green-600">
                    Member
                  </span>
                ) : (
                  <Button className="mt-2 text-sm px-3 py-1" variant="outline">
                    <Link href={`/dashboard/groups/${group.id}`}>
                      Browse Group
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
