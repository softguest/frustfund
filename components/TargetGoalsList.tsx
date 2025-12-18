// 'use client';

// import { useEffect, useState } from 'react';
// import { Progress } from '@/components/ui/progress';

// interface TargetGoal {
//   id: string;
//   name: string;
//   targetAmount: number;
//   currentBalance: number;
//   deadline: string;
//   accountId: string;
// }

// export default function TargetGoalsList() {
//   const [goals, setGoals] = useState<TargetGoal[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchGoals() {
//       try {
//         const res = await fetch('/api/accounts/target-goal');
//         const data = await res.json();
//         setGoals(data);
//       } catch (err) {
//         console.error('Error fetching goals:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchGoals();
//   }, []);

//   if (loading) {
//     return (
//       <div className="space-y-3">
//         {[1, 2, 3].map((_, i) => (
//           <div
//             key={i}
//             className="p-4 bg-white rounded-xl shadow border animate-pulse"
//           >
//             <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
//             <div className="h-6 w-1/2 bg-gray-200 rounded mb-2" />
//             <div className="h-3 w-1/4 bg-gray-200 rounded mb-2" />
//             <div className="h-2 bg-gray-200 rounded mt-2" />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (goals.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-600">
//         <p className="text-lg">You have no target goals yet.</p>
//         <p className="text-sm">Create your first savings goal to get started!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
//       {goals.map(goal => {
//         const progress = (goal.currentBalance / goal.targetAmount) * 100;

//         return (
//           <div
//             key={goal.id}
//             className="p-4 bg-white rounded-xl shadow border flex flex-col justify-between"
//           >
//             <div className="flex justify-between items-start">
//               <h2 className="text-lg font-bold text-gray-700">{goal.name}</h2>
//               <span className="text-xs sm:text-sm text-gray-500">
//                 {new Date(goal.deadline).toLocaleDateString()}
//               </span>
//             </div>

//             <div className="mt-2 space-y-1">
//               <p className="text-sm text-gray-700">
//                 Target: <strong>{goal.targetAmount.toLocaleString()} FCFA</strong>
//               </p>
//               <p className="text-sm text-gray-700">
//                 Saved: <strong>{goal.currentBalance.toLocaleString()} FCFA</strong>
//               </p>
//             </div>

//             <Progress value={progress} className="h-2 mt-3 rounded-full" />

//             <p className="text-xs text-gray-500 mt-1">
//               {progress.toFixed(0)}% completed
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface TargetGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentBalance: number;
  deadline: string;
  accountId: string;
}

export default function TargetGoalsList() {
  const [goals, setGoals] = useState<TargetGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const res = await fetch('/api/accounts/target-goal');
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error('Error fetching goals:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGoals();
  }, []);

  /* ---------- Loading Skeleton ---------- */
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="
              relative w-full rounded-2xl border border-white/20
              bg-white/30 backdrop-blur-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              animate-pulse
            "
          >
            <div className="h-4 w-1/3 rounded bg-white/40 mb-2" />
            <div className="h-6 w-1/2 rounded bg-white/40 mb-2" />
            <div className="h-3 w-1/4 rounded bg-white/40 mb-2" />
            <div className="h-2 bg-white/40 rounded mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-lg font-semibold">You have no target goals yet.</p>
        <p className="text-sm mt-1">Create your first savings goal to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {goals.map(goal => {
        const progress = (goal.currentBalance / goal.targetAmount) * 100;

        return (
          <div
            key={goal.id}
            className="
              relative flex flex-col justify-between w-full rounded-2xl
              border border-white/20 bg-white/30 backdrop-blur-xl
              p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            "
          >
            {/* Glow overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold text-gray-800">{goal.name}</h2>
                <span className="text-xs sm:text-sm text-gray-500">
                  {new Date(goal.deadline).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-700">
                  Target: <strong>{goal.targetAmount.toLocaleString()} FCFA</strong>
                </p>
                <p className="text-sm text-gray-700">
                  Saved: <strong>{goal.currentBalance.toLocaleString()} FCFA</strong>
                </p>
              </div>

              <Progress
                value={progress}
                className="h-2 mt-3 rounded-full bg-white/40"
              />

              <p className="text-xs text-gray-500 mt-1">{progress.toFixed(0)}% completed</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
