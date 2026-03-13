"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectStatusChart({
  projectStats,
}: {
  projectStats: {
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  };
}) {
  const data = {
    labels: ["Pending", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          projectStats.pending,
          projectStats.inProgress,
          projectStats.completed,
          projectStats.cancelled,
        ],
        backgroundColor: [
          "rgba(245, 158, 11, 0.7)",
          "rgba(6, 182, 212, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderColor: [
          "rgb(245, 158, 11)",
          "rgb(6, 182, 212)",
          "rgb(16, 185, 129)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "rgb(148, 163, 184)", padding: 16 },
      },
    },
    cutout: "60%",
  };

  return <Doughnut data={data} options={options} />;
}
