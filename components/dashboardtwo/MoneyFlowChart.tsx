// components/MoneyFlowChart/MoneyFlowChart.tsx
'use client';

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

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Profit',
        data: [1200, 1900, 3000, 2500, 3200, 2800, 4000, 4500, 3800, 4200, 4600, 5000],
        backgroundColor: '#E53935',
        borderRadius: 6,
      },
      {
        label: 'Income',
        data: [2000, 2500, 3500, 3000, 4000, 3700, 4200, 4800, 4500, 4700, 4900, 5200],
        backgroundColor: '#FFCDD2',
        borderRadius: 6,
      },
      {
        label: 'Expend',
        data: [800, 1200, 1500, 1300, 1600, 1400, 1800, 2000, 1700, 1900, 2100, 2300],
        backgroundColor: '#9E9E9E',
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 12,
            // Ensure literal type, not widened string
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Money Flow (12 Months)',
        color: '#333',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          // Example: format numbers nicely
          label: (ctx) => {
            const v = ctx.parsed.y;
            const datasetLabel = ctx.dataset.label ?? '';
            return `${datasetLabel}: $${Number(v).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#333' },
        grid: { color: '#E0E0E0' },
      },
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
    <div className="bg-white rounded shadow p-4 mt-6">
      <Bar options={options} data={data} />
    </div>
  );
}
