"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CreateGroupPage() {
  const [loading, setLoading] = useState(false);

  async function createGroup(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/groups/create", {
      method: "POST",
      body: JSON.stringify({
        name: e.target.name.value,
        description: e.target.description.value,
        userId: "YOUR_USER_ID",
      }),
    });

    const data = await res.json();
    setLoading(false);
    alert("Group created!");
  }

  return (
    <form onSubmit={createGroup} className="p-6 max-w-lg mx-auto space-y-3">
      <input
        name="name"
        placeholder="Group Name"
        className="border p-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full"
      />
      <Button disabled={loading}>{loading ? "..." : "Create Group"}</Button>
    </form>
  );
}
