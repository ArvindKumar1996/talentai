import React, { useState } from "react";
import axios from "axios";

export default function InterviewSchedule({ setCandidateId, setLoading }) {
  const [candidate, setCandidate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSchedule = async () => {
    if (!candidate || !interviewer || !dateTime) {
      setError(true);
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/interview/schedule",
        { candidateId: candidate, interviewer, dateTime }
      );

      setCandidateId(candidate);
      const htmlMessage = `
        <strong>Status:</strong> ${data.status}<br/>
        <strong>Candidate ID:</strong> ${data.candidateId}<br/>
        <strong>Interviewer:</strong> ${data.interviewer || "N/A"}<br/>
        <strong>Date & Time:</strong> ${data.dateTime || "N/A"}
      `;
      setMessage(htmlMessage);
      setError(false);

      setCandidate("");
      setInterviewer("");
      setDateTime("");
    } catch (err) {
      console.error("Interview scheduling error:", err);
      setMessage("Failed to schedule interview");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4">Interviews</h2>

      <div className="flex flex-col space-y-3 w-full">
        <input
          type="text"
          placeholder="Candidate ID"
          className="border p-2 rounded w-full"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Interviewer Name"
          className="border p-2 rounded w-full"
          value={interviewer}
          onChange={(e) => setInterviewer(e.target.value)}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded w-full"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <button
          onClick={handleSchedule}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Schedule Interview
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 p-3 rounded border ${
            error
              ? "bg-red-100 border-red-400 text-red-700"
              : "bg-green-100 border-green-400 text-green-700"
          }`}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
}
