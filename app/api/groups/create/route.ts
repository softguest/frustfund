// app/api/groups/create/route.ts
import { db } from "@/config/db";
import { groups, groupMembers } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, userId } = await req.json();

  // ✅ Insert group with correct columns
  const g = await db.insert(groups).values({
    name,
    description,
    userId,   // 👈 correct field name
  }).returning();

  // Add the creator as a group member
  await db.insert(groupMembers).values({
    groupId: g[0].id, 
    userId,
  });

  return NextResponse.json({ success: true, group: g[0] });
}
