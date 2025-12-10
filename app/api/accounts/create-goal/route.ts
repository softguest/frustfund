import { targetGoals, accounts } from "@/config/schema";
import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, name, targetAmount, deadline } = await req.json();

  // create target account
  const [acc] = await db
    .insert(accounts)
    .values({
      userId,
      type: "target",
      name: `Target - ${name}`,
    })
    .returning();

  await db.insert(targetGoals).values({
    userId,
    accountId: acc.id,
    name,
    targetAmount,
    deadline,
  });

  return NextResponse.json({ success: true });
}
