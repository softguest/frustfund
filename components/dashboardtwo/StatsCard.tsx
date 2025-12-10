export default function StatsCard({ title, balance, change, chart }: any) {
  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="text-2xl font-bold text-primary">{balance.toLocaleString()} XAF</p>
      <p className="text-sm text-gray-500">{change}</p>
      <div>{chart}</div>
    </div>
  );
}
