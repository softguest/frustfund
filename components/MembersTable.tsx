// "use client";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// export default function MembersTable({ members }: { members: any[] }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Group Members</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b">
//               <th>Name</th>
//               <th>Email</th>
//               <th>Joined</th>
//             </tr>
//           </thead>
//           <tbody>
//             {members.map((m) => (
//               <tr key={m.memberId} className="border-b">
//                 <td>{m.name ?? "Unknown"}</td>
//                 <td>{m.email ?? "No email"}</td>
//                 <td>{new Date(m.joinedAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MemberRow {
  memberId: string;
  userId: string;
  name: string | null;
  email: string | null;
  expected: number;
  contributed: number;
  remaining: number;
  status: "COMPLETED" | "ON_TRACK" | "BEHIND";
}

interface MembersTableProps {
  members: MemberRow[];
  groupId: string;
  isCreator: boolean;
}


export default function MembersTable({
  members,
  groupId,
  isCreator,
}: MembersTableProps) {
  const [values, setValues] = useState<Record<string, number>>({});

  async function save(memberId: string) {
    const expectedAmount = values[memberId];
    if (!expectedAmount || expectedAmount <= 0)
      return alert("Enter a valid amount");

    const res = await fetch(
      `/api/groups/${groupId}/members/${memberId}/expected-amount`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expectedAmount }),
      }
    );

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to update");

    alert("Expected amount updated");
  }

  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Member</th>
            <th className="p-2">Expected</th>
            <th className="p-2">Contributed</th>
            <th className="p-2">Remaining</th>
            <th className="p-2">Status</th>
            {isCreator && <th className="p-2">Action</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.memberId} className="border-t">
              <td className="p-2">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-gray-500">{m.email}</div>
              </td>

              <td className="p-2">
                {isCreator ? (
                  <input
                    type="number"
                    defaultValue={m.expected}
                    className="border p-1 w-24 rounded"
                    onChange={(e) =>
                      setValues((v) => ({
                        ...v,
                        [m.memberId]: Number(e.target.value),
                      }))
                    }
                  />
                ) : (
                  <span>{m.expected}</span>
                )}
              </td>

              <td className="p-2">{m.contributed}</td>
              <td className="p-2">{m.remaining}</td>

              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    m.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : m.status === "ON_TRACK"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {m.status}
                </span>
              </td>

              {isCreator && (
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => save(m.memberId)}
                  >
                    Save
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
