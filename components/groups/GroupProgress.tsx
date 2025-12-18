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
      <h3 className="text-lg font-semibold">Group Contribution Progress</h3>
      <hr className="my-2" />
      <p className="font-medium my-4 font-xl">
        Raised Funds
      </p>
      <p className="font-medium my-4 text-[24px] md:text-4xl">
        <strong>{raised.toLocaleString()}</strong> / {goal.toLocaleString()} XAF
      </p>
      <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
        <div
          className="bg-destructive h-4 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-1">
        {percent.toFixed(1)}% completed
      </p>
    </div>
  );
}
