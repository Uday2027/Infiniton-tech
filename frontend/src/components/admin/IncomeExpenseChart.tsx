"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IncomeExpenseChart({
  monthlyData,
}: {
  monthlyData: {
    label: string;
    incomeBdt: number;
    expenseBdt: number;
  }[];
}) {
  const data = {
    labels: monthlyData.map((m) => m.label),
    datasets: [
      {
        label: "Income (BDT ৳)",
        data: monthlyData.map((m) => m.incomeBdt),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Expenses (BDT ৳)",
        data: monthlyData.map((m) => m.expenseBdt),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "rgb(148, 163, 184)" } },
    },
    scales: {
      x: {
        ticks: { color: "rgb(100, 116, 139)" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "rgb(100, 116, 139)" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
