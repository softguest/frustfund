"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MembersTable({ members }: { members: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Members</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.memberId} className="border-b">
                <td>{m.name ?? "Unknown"}</td>
                <td>{m.email ?? "No email"}</td>
                <td>{new Date(m.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
