import { AccountCard } from "@/components/AccountCard";
import { GoalCard } from "@/components/GoalCard";
import { TransactionsTable } from "@/components/TransactionsTable";
import { getUserAccounts, getRecentTransactions } from "@/_actions/getAccounts";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth(); // extract the string

  if (!userId) {
    return <div>You must be logged in.</div>;
  }

  const accounts = await getUserAccounts(userId);
  const transactions = await getRecentTransactions(userId);

  // Identify accounts by type
  const current = accounts.find(a => a.type === "current");
  const savings = accounts.find(a => a.type === "savings");
  const targets = accounts.filter(a => a.type === "target");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Your Accounts</h1>

      {/* Account Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AccountCard title="Current Account" balance={current?.balance ?? 0} />
        <AccountCard title="Savings Account" balance={savings?.balance ?? 0} />
      </div>

      {/* Target Goals */}
      <h2 className="text-xl font-semibold mt-4">Your Target Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {targets.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      {/* Transactions */}
      <h2 className="text-xl font-semibold mt-4">Recent Transactions</h2>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
