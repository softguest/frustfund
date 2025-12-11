"use client";

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
    <div className="px-6 pb-6" >
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Top Groups</h1>
        <Link href="/dashboard/groups/create">
          <Button variant="destructive" className="text-white">
            Create Group
          </Button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search groups..."
        className="border p-2 rounded w-full mb-6"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <TopThreeGroups groups={groups} />
    </div>
  );
}
