// app/api/groups/[groupId]/route.ts
import { db } from "@/config/db";
import { groups, groupMembers, contributions } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const { groupId } = params;

  const group = await db.select().from(groups).where(eq(groups.id, groupId));

  const members = await db
    .select()
    .from(groupMembers)
    .where(eq(groupMembers.groupId, groupId));

  const contribs = await db
    .select()
    .from(contributions)
    .where(eq(contributions.groupId, groupId));

  const total = contribs.reduce((sum, c) => sum + Number(c.amount), 0);

  return NextResponse.json({
    group: group[0],
    members,
    contributions: contribs,
    total,
  });
}
