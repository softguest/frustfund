import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { groupMembers, groups } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const Schema = z.object({
  expectedAmount: z.number().positive(),
});

export async function PATCH(
  req: Request,
  // context: { params: { id: string; memberId: string } }
  context: { params: Promise<{ id: string; memberId: string }> }
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { expectedAmount } = Schema.parse(body);

  // Ensure user is group creator
  const group = await db.query.groups.findFirst({
    where: and(eq(groups.id, (await context.params).memberId), eq(groups.userId, userId)),
  });

  if (!group)
    return NextResponse.json(
      { error: "Only group creator can update expected amounts" },
      { status: 403 }
    );

  const updated = await db
    .update(groupMembers)
    .set({ expectedAmount: String(expectedAmount) })
    .where(eq(groupMembers.id, (await context.params).memberId))
    .returning();

  if (!updated.length)
    return NextResponse.json({ error: "Member not found" }, { status: 404 });

  return NextResponse.json({ success: true, member: updated[0] });
}
