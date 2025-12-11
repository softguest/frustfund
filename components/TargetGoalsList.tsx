"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

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
        const res = await fetch("/api/accounts/target-goal");
        const data = await res.json();

        setGoals(data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGoals();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6 font-medium text-gray-600">
        Loading goals...
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
    <div className="space-y-4">
      {goals.map(goal => {
        const progress =
          (goal.currentBalance / goal.targetAmount) * 100;

        return (
          <div
            key={goal.id}
            className="p-4 bg-white rounded shadow border"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{goal.name}</h2>
              <span className="text-sm text-gray-500">
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              Target: <strong>{goal.targetAmount.toLocaleString()} FCFA</strong>
            </p>

            <p className="text-sm text-gray-700 mt-1">
              Saved:{" "}
              <strong>{goal.currentBalance.toLocaleString()} FCFA</strong>
            </p>

            <Progress value={progress} className="h-2 mt-3" />

            <p className="text-xs text-gray-500 mt-1">
              {progress.toFixed(0)}% completed
            </p>
          </div>
        );
      })}
    </div>
  );
}
