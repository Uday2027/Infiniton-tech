"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function RevenueChart({
  monthlyData,
}: {
  monthlyData: {
    label: string;
    incomeBdt: number;
    incomeUsd: number;
    serviceChargesBdt: number;
  }[];
}) {
  const data = {
    labels: monthlyData.map((m) => m.label),
    datasets: [
      {
        label: "Total Revenue (BDT ৳)",
        data: monthlyData.map((m) => m.incomeBdt),
        borderColor: "rgb(6, 182, 212)",
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Service Charges (BDT ৳)",
        data: monthlyData.map((m) => m.serviceChargesBdt),
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
        yAxisID: "y",
      },
      {
        label: "Total Revenue (USD $)",
        data: monthlyData.map((m) => m.incomeUsd),
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.05)",
        fill: false,
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { labels: { color: "rgb(148, 163, 184)" } },
    },
    scales: {
      x: {
        ticks: { color: "rgb(100, 116, 139)" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        type: "linear" as const,
        position: "left" as const,
        ticks: { color: "rgb(6, 182, 212)" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y1: {
        type: "linear" as const,
        position: "right" as const,
        ticks: { color: "rgb(168, 85, 247)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return <Line data={data} options={options} />;
}
