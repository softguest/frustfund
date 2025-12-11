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
      { label: 'Deposits', data: [], backgroundColor: '#E53935', borderRadius: 6 },
      { label: 'Transfers', data: [], backgroundColor: '#FFCDD2', borderRadius: 6 },
      { label: 'Withdrawals', data: [], backgroundColor: '#9E9E9E', borderRadius: 6 },
    ],
  });

  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/analytics/money-flow');
      const data = await res.json();

      // Prepare 12 months fixed
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
          { label: 'Deposits', data: deposits, backgroundColor: '#E53935', borderRadius: 6 },
          { label: 'Transfers', data: transfers, backgroundColor: '#FFCDD2', borderRadius: 6 },
          { label: 'Withdrawals', data: withdrawals, backgroundColor: '#9E9E9E', borderRadius: 6 },
        ],
      });
    }

    loadData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#333', font: { size: 12, weight: 'bold' } },
      },
      title: {
        display: true,
        text: 'Money Flow (12 Months)',
        color: '#333',
        font: { size: 16, weight: 'bold' },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString()} XAF`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#333' }, grid: { color: '#E0E0E0' } },
      y: {
        ticks: {
          color: '#333',
          callback: (value) => `${Number(value).toLocaleString()} XAF`,
        },
        grid: { color: '#E0E0E0' },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded shadow p-4 mt-6">
      <Bar options={options} data={chartData} />
    </div>
  );
}
