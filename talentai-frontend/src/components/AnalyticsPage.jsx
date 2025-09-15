import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import AnalyticsDashboard from "./AnalyticsDashboard";
import AnalyticsTable from "./AnalyticsTable";
import axios from "axios";

export default function AnalyticsPage() {
  const [summary, setSummary] = useState(null);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const summaryRes = await axios.get(
        "http://localhost:8080/api/analytics/summary"
      );
      setSummary(summaryRes.data);

      const reportRes = await axios.get(
        "http://localhost:8080/api/analytics/report"
      );
      setReport(reportRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch analytics");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {loading && <Loader />}

      <h2 className="text-xl font-bold mb-4">Analytics & Reports</h2>

      {summary && <AnalyticsDashboard summary={summary} />}
      {report.length > 0 && <AnalyticsTable report={report} />}
    </div>
  );
}
