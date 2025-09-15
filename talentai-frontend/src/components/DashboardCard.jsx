import React from "react";

export const DashboardCard = ({ title, value }) => (
  <div className="p-4 border rounded shadow hover:shadow-md transition">
    <div className="text-gray-500">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);
