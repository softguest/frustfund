import { db } from "@/config/db";
import { groupMembers } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
 
export async function PATCH(
   req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

//   if (!session?.isAdmin) {
if (!session?.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { expectedAmount } = await req.json();

  if (expectedAmount <= 0) {
    return NextResponse.json(
      { error: "Invalid amount" },
      { status: 400 }
    );
  }

  await db
    .update(groupMembers)
    .set({ expectedAmount })
    .where(eq(groupMembers.id, (await context.params).id));

  return NextResponse.json({ success: true });
}
