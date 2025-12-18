"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

type Contribution = {
  id: string;
  amount: string;
  createdAt: Date | string;
  user: {
    fullName: string;
  } | null;
};

export default function ContributionsTable({
  contributions,
}: {
  contributions: Contribution[];
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
              <th className="text-left">Amount</th>
              <th className="text-left">User</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {contributions.map((c) => (
              <tr key={c.id} className="border-b">
                <td>{c.amount} XAF</td>
                <td>{c.user?.fullName ?? "Unknown user"}</td>
                <td>
                  {new Date(c.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
