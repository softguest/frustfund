export default function GroupProgress({
  goal,
  raised,
}: {
  goal: number;
  raised: number;
}) {
  const percent = Math.min((raised / goal) * 100, 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="font-medium">
        Raised {raised.toLocaleString()} / {goal.toLocaleString()} XAF
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
        <div
          className="bg-green-600 h-3 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-1">
        {percent.toFixed(1)}% completed
      </p>
    </div>
  );
}
