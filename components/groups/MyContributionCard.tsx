// export default function MyContributionCard({
//   contributed,
//   expected,
//   percentage,
// }: {
//   contributed: number;
//   expected: number;
//   percentage: number;
// }) {
//   return (
//     <div className="rounded-xl border p-6 bg-white space-y-4">
//       <h3 className="text-lg font-semibold">My Contribution</h3>

//       <div className="flex justify-between text-sm">
//         <span className="text-gray-600">Contributed</span>
//         <span className="font-medium">
//           {contributed.toLocaleString()} FCFA
//         </span>
//       </div>

//       <div className="flex justify-between text-sm">
//         <span className="text-gray-600">Expected</span>
//         <span className="font-medium">
//           {expected.toLocaleString()} FCFA
//         </span>
//       </div>

//       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-green-600 transition-all"
//           style={{ width: `${percentage}%` }}
//         />
//       </div>

//       <p className="text-xs text-gray-500">
//         {percentage.toFixed(1)}% completed
//       </p>
//     </div>
//   );
// }


export default function MyContributionCard({
  contributed,
  expected,
  remaining,
  percentage,
  status,
}: {
  contributed: number;
  expected: number;
  remaining: number;
  percentage: number;
  status: "COMPLETED" | "ON_TRACK" | "BEHIND";
}) {
  const statusColor = {
    COMPLETED: "text-green-600",
    ON_TRACK: "text-yellow-600",
    BEHIND: "text-red-600",
  }[status];

  return (
    <div className="rounded-xl border p-6 bg-white space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">My Contribution</h3>
        <span className={`text-xs font-semibold ${statusColor}`}>
          {status.replace("_", " ")}
        </span>
      </div>

      <Stat label="Contributed" value={`${contributed.toLocaleString()} FCFA`} />
      <Stat label="Expected" value={`${expected.toLocaleString()} FCFA`} />
      <Stat label="Remaining" value={`${remaining.toLocaleString()} FCFA`} />

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-gray-500">
        {percentage.toFixed(1)}% completed
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
