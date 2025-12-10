import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { accounts } from "@/config/schema";

export async function POST(req: Request) {
  const { userId } = await req.json();

await db.insert(accounts).values([
  { userId, type: "current", name: "Current Account" },
  { userId, type: "savings", name: "Savings Account" },
]);


  return NextResponse.json({ success: true });
}
