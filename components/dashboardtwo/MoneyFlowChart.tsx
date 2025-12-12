'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MoneyFlowChart() {
  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels,
    datasets: [
      { label: 'Deposits', data: [], backgroundColor: '#22c55e', borderRadius: 6 },
      { label: 'Transfers', data: [], backgroundColor: '#3b82f6', borderRadius: 6 },
      { label: 'Withdrawals', data: [], backgroundColor: '#ef4444', borderRadius: 6 },
    ],
  });

  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/analytics/money-flow');
      const data = await res.json();

      const deposits = Array(12).fill(0);
      const withdrawals = Array(12).fill(0);
      const transfers = Array(12).fill(0);

      data.forEach((row: any) => {
        const index = Number(row.month) - 1;
        deposits[index] = Number(row.deposits);
        withdrawals[index] = Number(row.withdrawals);
        transfers[index] = Number(row.transfers);
      });

      setChartData({
        labels,
        datasets: [
          { label: 'Deposits', data: deposits, backgroundColor: '#22c55e', borderRadius: 6 },
          { label: 'Transfers', data: transfers, backgroundColor: '#3b82f6', borderRadius: 6 },
          { label: 'Withdrawals', data: withdrawals, backgroundColor: '#ef4444', borderRadius: 6 },
        ],
      });
    }

    loadData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Allows height to be set via CSS
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: { size: 12, weight: 'bold' },
        },
      },
      title: {
        display: true,
        text: 'Money Flow (12 Months)',
        color: '#111827',
        font: { size: 14, weight: 'bold' }, // Smaller for mobile
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString()} XAF`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#374151', font: { size: 10 } },
        grid: { color: '#e5e7eb' },
        stacked: false,
      },
      y: {
        ticks: {
          color: '#374151',
          font: { size: 10 },
          callback: (value) => `${Number(value).toLocaleString()} XAF`,
        },
        grid: { color: '#e5e7eb' },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 mt-6 h-64 sm:h-80">
      {/* Responsive container */}
      <Bar options={options} data={chartData} />
    </div>
  );
}
