import React, { useState } from "react";
import InterviewSchedule from "./InterviewSchedule";
import FeedbackForm from "./FeedbackForm";
import Loader from "./Loader";

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [candidateId, setCandidateId] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {loading && <Loader />}

      <h2 className="text-xl font-bold mb-4">Interviews</h2>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "schedule" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule Interview
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "feedback" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("feedback")}
          disabled={!candidateId}
        >
          Submit Feedback
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "schedule" && (
          <InterviewSchedule
            setCandidateId={setCandidateId}
            setLoading={setLoading}
          />
        )}
        {activeTab === "feedback" && candidateId && (
          <FeedbackForm candidateId={candidateId} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}
