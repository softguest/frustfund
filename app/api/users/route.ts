import { db } from "@/config/db";
import { users } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const email = user.primaryEmailAddress?.emailAddress;
    const fullName = user.fullName || "";
    const clerkId = user.id; // Clerk user ID
    const phone = user.phoneNumbers?.[0]?.phoneNumber || "";

    if (!email) {
      return NextResponse.json(
        { error: "User must have an email" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.id, clerkId)); // Check by Clerk ID

    if (existing.length > 0) {
      return NextResponse.json(existing[0]);
    }

    // Create new user
    const result = await db
      .insert(users)
      .values({
        id: clerkId,        // <-- IMPORTANT: set id explicitly
        clerkId,
        email,
        fullName,
        phone,
        status: "pending", // optional; default in schema
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (e) {
    console.error("USER CREATE ERROR:", e);
    return NextResponse.json(
      { error: "Internal error creating user" },
      { status: 500 }
    );
  }
}
