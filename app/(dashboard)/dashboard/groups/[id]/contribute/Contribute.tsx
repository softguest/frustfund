 "use client";

import { Button } from "@/components/ui/button";

export default function Contribute({ groupId }: { groupId: string }) {
  async function handleContribute(e: any) {
    e.preventDefault();

    const value = Number(e.target.amount.value);
    if (!value || value <= 0) return alert("Enter a valid amount");

    const res = await fetch("/api/groups/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, amount: value }),
      });

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to contribute");

    alert("Contribution added!");
  }

  return (
    <div className="flex justify-center p-6">
      <div>
        <h4>Enter Amount to Contribute to this group.</h4>
          <form onSubmit={handleContribute} className="mt-4 m-w-32 space-y-2">
            <input
              type="number"
              name="amount"
              min="100"
              className="w-full border p-2"
              placeholder="Enter amount"
            />
            <Button className="w-full bg-destructive text-white p-2">Contribute</Button>
          </form>
      </div>
    </div>
  );
}
