import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsTable({ report }) {
  // Dummy chart data based on report
  const barData = report.map((r) => ({
    name: r.candidateName,
    score: r.score,
  }));

  const statusCounts = report.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  const COLORS = ["#4ade80", "#facc15", "#f87171", "#3b82f6"];

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Candidate ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Score (%)
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Interview Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {report.map((row) => (
              <tr key={row.candidateId}>
                <td className="px-4 py-2">{row.candidateId}</td>
                <td className="px-4 py-2">{row.candidateName}</td>
                <td className="px-4 py-2">{row.score}%</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2">{row.interviewDate || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Candidate Scores</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
