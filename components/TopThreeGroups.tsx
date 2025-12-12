"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
}

interface Props {
  groups: Group[];
}

const TopThreeGroups: FC<Props> = ({ groups }) => {
  if (!groups || groups.length === 0) {
    return <p>No top groups found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {groups.map(group => (
        <div key={group.id} className="p-4 border rounded shadow bg-white">
          <h3 className="text-xl font-bold">{group.name}</h3>
          <hr className="my-2" />
          <p className="text-sm text-gray-600 mb-2">{group.description}</p>
          <div className="flex justify-between items-center">
            <p className="font-semibold">
              Members: {group.memberCount}
            </p>
            <div>
              <Link href={`/dashboard/groups/${group.id}/contribute`} className="text-white rounded-full cursor-pointer bg-destructive p-2 flex items-center px-3">
                  +
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopThreeGroups;