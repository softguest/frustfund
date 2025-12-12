'use client';

interface TransactionListProps {
  transactions: any[]; // Accept raw data
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow p-4 mt-6 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h3>

      {/* Table layout for md+ */}
      <table className="hidden md:table w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-3">Type</th>
            <th className="py-2 px-3">From</th>
            <th className="py-2 px-3">To</th>
            <th className="py-2 px-3">Amount</th>
            <th className="py-2 px-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3">{tx.type}</td>
              <td className="py-2 px-3">{tx.fromAccountId || '-'}</td>
              <td className="py-2 px-3">{tx.toAccountId || '-'}</td>
              <td className={`py-2 px-3 font-bold ${
                tx.type === 'transfer_debit' || tx.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
              }`}>
                {Number(tx.amount).toLocaleString()} XAF
              </td>
              <td className="py-2 px-3 text-gray-500">
                {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card layout for mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {transactions.map(tx => (
          <div key={tx.id} className="p-3 bg-gray-50 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700">{tx.type}</span>
              <span className={`font-bold ${
                tx.type === 'transfer_debit' || tx.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
              }`}>
                {Number(tx.amount).toLocaleString()} XAF
              </span>
            </div>
            <div className="text-sm text-gray-500">
              From: {tx.fromAccountId || '-'} <br />
              To: {tx.toAccountId || '-'} <br />
              Date: {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
