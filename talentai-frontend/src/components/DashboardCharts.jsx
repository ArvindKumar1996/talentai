import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const DashboardCharts = ({ barData, pieData, lineData }) => {
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: {
      legend: { display: true, position: "bottom" },
      tooltip: { enabled: true },
      datalabels: {
        color: "#111",
        font: { weight: "bold", size: 12 },
        clamp: true,
        formatter: (value) => value,
        anchor: "end",
        align: "end",
        offset: 4, // add space between label and bar
      },
    },
    layout: { padding: 10 },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { maxRotation: 45, minRotation: 30 }, // rotate X labels to avoid overlap
      },
      y: { beginAtZero: true },
    },
  };

  const horizontalBarOptions = {
    ...barOptions,
    indexAxis: "y",
    plugins: {
      ...barOptions.plugins,
      datalabels: {
        ...barOptions.plugins.datalabels,
        anchor: "end",
        align: "end",
        offset: 4,
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: {
        ticks: {
          autoSkip: false, // show all candidate names
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom" },
      tooltip: { enabled: true },
      datalabels: {
        color: "#111",
        anchor: "end",
        align: "top",
        font: { weight: "bold", size: 12 },
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom" },
      tooltip: { enabled: true },
      datalabels: {
        color: "#111",
        anchor: "center",
        align: "center",
        font: { weight: "bold", size: 12 },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm h-80">
        <h3 className="text-gray-700 font-semibold mb-2">Candidate Scores</h3>
        <Bar data={barData} options={barOptions} plugins={[ChartDataLabels]} />
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm h-80">
        <h3 className="text-gray-700 font-semibold mb-2">
          Resumes Processed Distribution
        </h3>
        <Doughnut
          data={pieData}
          options={doughnutOptions}
          plugins={[ChartDataLabels]}
        />
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm h-80">
        <h3 className="text-gray-700 font-semibold mb-2">
          Scheduled Interviews Trend
        </h3>
        <Line
          data={lineData}
          options={lineOptions}
          plugins={[ChartDataLabels]}
        />
      </div>

      {/* Horizontal Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm h-80">
        <h3 className="text-gray-700 font-semibold mb-2">
          Top Candidates Skills
        </h3>
        <Bar
          data={{
            labels: ["Candidate A", "Candidate B", "Candidate C"],
            datasets: [
              {
                label: "Skill Score",
                data: [90, 85, 80],
                backgroundColor: "rgba(99,102,241,0.7)",
                borderRadius: 6,
              },
            ],
          }}
          options={horizontalBarOptions}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  );
};
