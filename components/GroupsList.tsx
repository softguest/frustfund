"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Group {
  id: string;
  name: string;
  description?: string;
  isMember: boolean;
  memberCount: number;
}

interface GroupsListProps {
  groups: Group[];
  loading: boolean;
  onJoin: (id: string) => void;
}

export default function GroupsList({ groups, loading, onJoin }: GroupsListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map(group => (
        <div
          key={group.id}
          className={`border p-4 rounded-lg shadow flex flex-col justify-between ${
            group.isMember ? "bg-green-50 border-green-400" : "bg-white"
          }`}
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
            <hr className="mb-4"/>
            <p className="text-gray-600 mb-2">
              {group.description || "No description"}
            </p>
            <p className="text-sm text-gray-500">{group.memberCount} members</p>
          </div>

          <div className="flex gap-2 mt-4">
                <div className="flex gap-2">
                    <Button
                    variant="outline"
                    disabled={group.isMember || loading}
                    onClick={() => onJoin(group.id)}
                    >
                        {group.isMember ? "Member" : "Join"}
                    </Button>

                    <Link href={`/dashboard/groups/${group.id}`}>
                        <Button variant="outline">View Group</Button>
                    </Link>
                </div>
                <div>
                    <Link href={`/dashboard/groups/${group.id}/contribute`} className=" w-full">
                        <Button variant="destructive" className="text-white">Contribute to group <FiArrowRight /></Button>
                    </Link>
                </div>
          </div>
        </div>
      ))}
    </div>
  );
}
