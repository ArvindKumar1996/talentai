import React from "react";

export default function AnalyticsDashboard({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Total Resumes</p>
        <p className="text-2xl font-bold">{summary.totalResumes}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Shortlisted</p>
        <p className="text-2xl font-bold">{summary.shortlisted}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Rejected</p>
        <p className="text-2xl font-bold">{summary.rejected}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Average Score</p>
        <p className="text-2xl font-bold">{summary.averageScore}%</p>
      </div>
    </div>
  );
}
