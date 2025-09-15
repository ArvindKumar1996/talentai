import React from "react";
import { Hero } from "../components/Hero";
import { DashboardCard } from "../components/DashboardCard";
import { DashboardCharts } from "../components/DashboardCharts";
import { TalentAIWorkflow } from "../components/TalentAIWorkflow";

export const Home = () => {
  const metrics = [
    { title: "Total Resumes Processed", value: 150 },
    { title: "Top Candidates", value: 25 },
    { title: "Scheduled Interviews", value: 10 },
    { title: "Messages Sent", value: 50 },
  ];

  const barData = {
    labels: ["Candidate1", "Candidate2", "Candidate3"],
    datasets: [
      {
        label: "Score",
        data: [80, 90, 70],
        backgroundColor: "rgba(99,102,241,0.7)",
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ["Frontend", "Backend", "QA", "Design"],
    datasets: [
      {
        data: [50, 40, 30, 20],
        backgroundColor: ["#6366F1", "#A78BFA", "#C7D2FE", "#E0E7FF"],
      },
    ],
  };

  const lineData = {
    labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
      {
        label: "Scheduled Interviews",
        data: [5, 8, 6, 10],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <Hero />

      {/* Metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {metrics.map((m, i) => (
          <DashboardCard key={i} title={m.title} value={m.value} />
        ))}
      </div>

      {/* Charts section */}
      <DashboardCharts
        barData={barData}
        pieData={pieData}
        lineData={lineData}
      />

      {/* Horizontal TalentAI Workflow */}
      <TalentAIWorkflow />
    </div>
  );
};
