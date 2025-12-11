import TransactionTable from "@/components/transactions/TransactionTable";
import { getCurrentUser } from "@/lib/auth";

export default async function TransactionsPage() {
  const user = await getCurrentUser();

  return (
    <div className="container p-8">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      <TransactionTable userId={user.id} />
    </div>
  );
}
