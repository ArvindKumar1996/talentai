import React, { useState } from "react";

export default function JobEnrichment({ onEnrich, jobData, onProceed }) {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription) return alert("Please enter a Job Description");
    onEnrich(jobDescription); // Call parent to enrich job
  };

  return (
    <div className="bg-white shadow rounded p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Job Enrichment</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2 mb-4 h-32"
          placeholder="Enter Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enrich
          </button>

          {jobData && (
            <button
              type="button"
              onClick={() => onProceed(jobData)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Proceed
            </button>
          )}
        </div>
      </form>

      {jobData && (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Enriched Job Info</h3>
          <p>
            <strong>Title:</strong> {jobData.jobTitle}
          </p>
          <p>
            <strong>Description:</strong> {jobData.enrichedDescription}
          </p>
          <p>
            <strong>Skills:</strong> {jobData.skills.join(", ")}
          </p>
          <p>
            <strong>Responsibilities:</strong>{" "}
            {jobData.responsibilities.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
