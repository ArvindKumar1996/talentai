import React, { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

export default function OfferLetter() {
  const [candidateId, setCandidateId] = useState("dummy-123"); // default for testing
  const [position, setPosition] = useState("Software Engineer"); // default
  const [salary, setSalary] = useState("50000"); // default
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // success/error messages
  const [error, setError] = useState(false);

  const generateOffer = async () => {
    if (!candidateId || !position || !salary) {
      setError(true);
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");
    setError(false);

    try {
      // API call to generate offer
      const { data } = await axios.post("/api/offer/generate", {
        candidateId,
        position,
        salary,
      });

      // If API fails in test, fallback to dummy message
      const statusMessage =
        data?.status || "Offer generated successfully (dummy)";
      setMessage(statusMessage);
      setError(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to generate offer (using dummy data)");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const downloadOffer = async () => {
    if (!candidateId) {
      setError(true);
      setMessage("Candidate ID required to download");
      return;
    }

    setLoading(true);
    setMessage("");
    setError(false);

    try {
      // API call to download offer
      const res = await axios.get(`/api/offer/download/${candidateId}`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `offer_${candidateId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      setMessage("Offer downloaded successfully");
      setError(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to download offer (dummy download)");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      {loading && <Loader />}

      <h2 className="text-xl font-bold mb-4">Offer Letter</h2>

      <div className="flex flex-col space-y-3 w-full">
        <input
          type="text"
          placeholder="Candidate ID"
          className="border p-2 rounded w-full"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          className="border p-2 rounded w-full"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          placeholder="Salary"
          className="border p-2 rounded w-full"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button
          onClick={generateOffer}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Generate Offer
        </button>
        <button
          onClick={downloadOffer}
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
        >
          Download Offer
        </button>
      </div>

      {message && (
        <div
          className={`mt-3 p-3 rounded border ${
            error
              ? "bg-red-100 border-red-400 text-red-700"
              : "bg-green-100 border-green-400 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
