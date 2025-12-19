// "use client";
// import { useEffect, useState } from "react";
// import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// interface StatsCardProps {
//   title: string;
//   balance: number;
//   change: string; // "+12%" or "-5%"
//   chartData?: number[];
//   loading?: boolean;
// }

// export default function StatsCard({
//   title,
//   balance,
//   change,
//   chartData = [],
//   loading,
// }: StatsCardProps) {
//   const [animatedBalance, setAnimatedBalance] = useState(0);
//   const isPositive = change.startsWith("+");

//   // Animated counter effect
//   useEffect(() => {
//     if (loading) return;

//     let start = 0;
//     const end = balance;
//     const duration = 800;
//     const steps = 60;
//     const step = (end - start) / steps;
//     let current = start;

//     const counter = setInterval(() => {
//       current += step;
//       if (current >= end) {
//         current = end;
//         clearInterval(counter);
//       }
//       setAnimatedBalance(Math.floor(current));
//     }, duration / steps);

//     return () => clearInterval(counter);
//   }, [balance, loading]);

//   // Skeleton loading UI
//   if (loading) {
//     return (
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 w-full animate-pulse">
//         <div className="h-4 w-1/3 bg-red-200 rounded mb-4" />
//         <div className="h-7 w-1/2 bg-red-200 rounded mb-4" />
//         <div className="h-4 w-1/4 bg-red-200 rounded mb-4" />
//         <div className="h-16 bg-red-200 rounded" />
//       </div>
//     );
//   }

//   // Convert chartData to Recharts format
//   const chartArray = chartData.length
//     ? chartData.map((value, i) => ({ name: i, value }))
//     : [5, 10, 5, 20, 8, 15].map((value, i) => ({ name: i, value }));

//   return (
//     <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 w-full 
//       hover:shadow-md transition-shadow duration-200 space-y-3">

//       <h3 className="text-sm sm:text-base font-semibold text-gray-700">{title}</h3>

//       {/* Animated Balance */}
//       <p className="text-xl sm:text-2xl font-bold text-red-600">
//         {animatedBalance.toLocaleString()} XAF
//       </p>

//       {/* Trend Indicator */}
//       <div className="flex items-center gap-1 text-sm">
//         {isPositive ? (
//           <FiArrowUpRight className="text-green-600" />
//         ) : (
//           <FiArrowDownRight className="text-red-600" />
//         )}

//         <span className={isPositive ? "text-green-600" : "text-red-600"}>
//           {change}
//         </span>
//       </div>

//       {/* Mini Area Chart */}
//       <div className="h-16 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={chartArray}>
//             <defs>
//               <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.4} />
//                 <stop offset="100%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="name" hide />
//             <YAxis hide />
//             <Tooltip
//               contentStyle={{ backgroundColor: "#e4e4e4ff", border: "none", boxShadow: "0 2px 6px #970e0eff" }}
//               formatter={(value: any) => `${value.toLocaleString()} XAF`}
//             />
//             <Area
//               type="monotone"
//               dataKey="value"
//               stroke={isPositive ? "#c52222ff" : "#ef4444"}
//               // fill={`url(#color${title})`}
//               fill={`url(#color${title})`}
//               strokeWidth={2}
//               dot={false}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


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
  change: string;
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

  useEffect(() => {
    if (loading) return;

    let start = 0;
    const end = balance;
    const duration = 900;
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

  /* ---------- Skeleton ---------- */
  if (loading) {
    return (
      <div className="relative w-full rounded-2xl border border-white/20 bg-white/30 p-4 backdrop-blur-xl animate-pulse">
        <div className="h-4 w-1/3 rounded bg-white/40 mb-4" />
        <div className="h-7 w-1/2 rounded bg-white/40 mb-4" />
        <div className="h-4 w-1/4 rounded bg-white/40 mb-4" />
        <div className="h-16 rounded bg-white/40" />
      </div>
    );
  }

  const chartArray = chartData.length
    ? chartData.map((value, i) => ({ name: i, value }))
    : [5, 10, 5, 20, 8, 15].map((value, i) => ({ name: i, value }));

  return (
    <div
      className="
        group relative w-full rounded-2xl
        border border-white/20
        bg-white/30 backdrop-blur-xl
        bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-100
        p-4 sm:p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      "
    >
      {/* Glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Title */}
      <h3 className="relative z-10 text-sm font-medium text-gray-600">
        {title}
      </h3>

      {/* Balance */}
      <p className="relative z-10 mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
        {animatedBalance.toLocaleString()}
        <span className="ml-1 text-sm font-medium text-gray-500">XAF</span>
      </p>

      {/* Trend */}
      <div className="relative z-10 mt-1 flex items-center gap-1 text-sm">
        {isPositive ? (
          <FiArrowUpRight className="text-emerald-500" />
        ) : (
          <FiArrowDownRight className="text-red-500" />
        )}
        <span className={isPositive ? "text-emerald-500" : "text-red-500"}>
          {change}
        </span>
      </div>

      {/* Chart */}
      <div className="relative z-10 mt-3 h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartArray}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
                  stopOpacity={0.45}
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" hide />
            <YAxis hide />

            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(value: any) => `${value.toLocaleString()} XAF`}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              fill={`url(#grad-${title})`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
