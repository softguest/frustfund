import { db } from "@/config/db";
import { groupMembers, contributions, users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Group ID is required" },
        { status: 400 }
      );
    }

    // Group info
    const group = await db.query.groups.findFirst({
      where: (g, { eq }) => eq(g.id, id),
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Members + user info
    const members = await db
      .select({
        id: groupMembers.id,
        userId: groupMembers.userId,
        joinedAt: groupMembers.joinedAt,
        userName: users.fullName,
        userEmail: users.email,
      })
      .from(groupMembers)
      .leftJoin(users, eq(users.id, groupMembers.userId))
      .where(eq(groupMembers.groupId, id));

    // Contributions
    const contributionLogs = await db
      .select()
      .from(contributions)
      .where(eq(contributions.groupId, id));

    return NextResponse.json({
      group,
      members,
      contributions: contributionLogs,
    });
  } catch (err) {
    console.error("GET /api/groups/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
