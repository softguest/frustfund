"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ContributionsTable({
  contributions,
}: {
  contributions: any[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributions</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th>Amount</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c.id} className="border-b">
                <td>{c.amount} XAF</td>
                <td>{c.userId}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
