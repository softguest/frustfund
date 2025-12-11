import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { targetGoals, accounts } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get all accounts owned by this user
    const userAccounts = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId));

    if (userAccounts.length === 0) {
      return NextResponse.json([]);
    }

    const accountIds = userAccounts.map(a => a.id);

    // Get goals tied to *any* of the user's accounts
    const goals = await db
      .select()
      .from(targetGoals)
      .where(eq(targetGoals.userId, userId));

    return NextResponse.json(goals);
  } catch (error) {
    console.error("FETCH GOALS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch target goals" },
      { status: 500 }
    );
  }
}
