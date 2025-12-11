// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/config/db";
// import { accounts } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import TransferPageClient from "./TransferPageClient";

// export default async function TransferPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">You must be logged in.</div>;
//   }

//   const userAccounts = await db
//     .select()
//     .from(accounts)
//     .where(eq(accounts.userId, userId));

//   // Convert balances to number safely
//   const cleaned = userAccounts.map((acc) => ({
//     id: acc.id,
//     name: acc.name,
//     balance: acc.balance ? Number(acc.balance) : 0,
//   }));

//   return <TransferPageClient accounts={cleaned} />;
// }


import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { accounts } from "@/config/schema";
import { eq } from "drizzle-orm";
import TransferPageClient from "./TransferPageClient";

export default async function TransferPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-6">You must be logged in.</div>;
  }

  const userAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  // Convert balances to number safely
  const cleaned = userAccounts.map((acc) => ({
    id: acc.id,
    name: acc.name,
    balance: acc.balance ? Number(acc.balance) : 0,
  }));

  return <TransferPageClient accounts={cleaned} />;
}
