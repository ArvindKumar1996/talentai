import React, { useState } from "react";
import JobEnrichment from "./JobEnrichment";
import Loader from "./Loader";
import axios from "axios";

export default function JobEnrichmentPage({ onNext }) {
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState(null);

  const handleEnrichJob = async (jobDescription) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/job/enrich", {
        jobDescription,
      });
      setJobData(res.data);
    } catch (err) {
      console.error("Error enriching job:", err);
      alert("Failed to enrich job description");
    }
    setLoading(false);
  };

  const handleProceed = (data) => {
    // Pass enriched job data to next page (Candidate Screening)
    onNext(data);
  };

  return (
    <div className="relative">
      {loading && <Loader />}
      <JobEnrichment
        onEnrich={handleEnrichJob}
        jobData={jobData}
        onProceed={handleProceed}
      />
    </div>
  );
}
