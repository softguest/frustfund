"use client";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface StatsCardProps {
  title: string;
  balance: number;
  change: string; // "+12%" or "-5%"
  chartData?: number[];
  loading?: boolean;
}

export default function StatsCard({
  title,
  balance,
  change,
  chartData = [],
  loading,
}: StatsCardProps) {
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const isPositive = change.startsWith("+");

  // Animated counter effect
  useEffect(() => {
    if (loading) return;

    let start = 0;
    const end = balance;
    const duration = 800;
    const steps = 60;
    const step = (end - start) / steps;
    let current = start;

    const counter = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(counter);
      }
      setAnimatedBalance(Math.floor(current));
    }, duration / steps);

    return () => clearInterval(counter);
  }, [balance, loading]);

  // Skeleton loading UI
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full animate-pulse">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
        <div className="h-7 w-1/2 bg-gray-200 rounded mb-4" />
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-4" />
        <div className="h-16 bg-gray-200 rounded" />
      </div>
    );
  }

  // Convert chartData to Recharts format
  const chartArray = chartData.length
    ? chartData.map((value, i) => ({ name: i, value }))
    : [5, 10, 5, 20, 8, 15].map((value, i) => ({ name: i, value }));

  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 w-full 
      hover:shadow-md transition-shadow duration-200 space-y-3">

      <h3 className="text-sm sm:text-base font-semibold text-gray-700">{title}</h3>

      {/* Animated Balance */}
      <p className="text-xl sm:text-2xl font-bold text-red-600">
        {animatedBalance.toLocaleString()} XAF
      </p>

      {/* Trend Indicator */}
      <div className="flex items-center gap-1 text-sm">
        {isPositive ? (
          <FiArrowUpRight className="text-green-600" />
        ) : (
          <FiArrowDownRight className="text-red-600" />
        )}

        <span className={isPositive ? "text-green-600" : "text-red-600"}>
          {change}
        </span>
      </div>

      {/* Mini Area Chart */}
      <div className="h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartArray}>
            <defs>
              <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.4} />
                <stop offset="100%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
              formatter={(value: any) => `${value.toLocaleString()} XAF`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              fill={`url(#color${title})`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
