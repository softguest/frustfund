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

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl shadow border animate-pulse"
          >
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-1/4 bg-gray-200 rounded mb-2" />
            <div className="h-2 bg-gray-200 rounded mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-lg">You have no target goals yet.</p>
        <p className="text-sm">Create your first savings goal to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {goals.map(goal => {
        const progress = (goal.currentBalance / goal.targetAmount) * 100;

        return (
          <div
            key={goal.id}
            className="p-4 bg-white rounded-xl shadow border flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-gray-700">{goal.name}</h2>
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

            <Progress value={progress} className="h-2 mt-3 rounded-full" />

            <p className="text-xs text-gray-500 mt-1">
              {progress.toFixed(0)}% completed
            </p>
          </div>
        );
      })}
    </div>
  );
}
