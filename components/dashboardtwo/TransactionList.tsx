// components/TransactionList/TransactionList.tsx

type Transaction = {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: string;
};

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: { transactions: any[] }) {
  return (
    <div className="w-full bg-white rounded shadow p-4 mt-6">
      <h3 className="text-lg font-semibold text-text mb-4">Recent Transactions</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-muted">
            <th className="py-2">Type</th>
            <th className="py-2">From</th>
            <th className="py-2">To</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-b border-muted hover:bg-secondary">
              <td className="py-2">{tx.type}</td>
              <td className="p-3">
                {tx.fromAccountId}
              </td>
              <td className="p-3">
                {tx.toAccountId}
              </td>
              <td
                className={`p-3 font-bold ${
                  tx.type === "transfer_debit" || tx.type === "withdrawal" ? "text-red-500" : "text-green-500"
                }`}
              >
                {Number(tx.amount).toLocaleString()} XAF
              </td>
              <td className="py-2 text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
