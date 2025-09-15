import React, { useState } from "react";
import axios from "axios";

export default function FeedbackForm({ candidateId, setLoading }) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!feedback || rating < 1 || rating > 5) {
      setError(true);
      setMessage("Enter feedback and valid rating (1-5)");
      return;
    }

    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/interview/feedback",
        { candidateId, feedback, rating }
      );

      const htmlMessage = `
        <strong>Candidate ID:</strong> ${data.candidateId}<br/>
        <strong>Rating:</strong> ${data.rating}<br/>
        <strong>Feedback:</strong><br/>${data.feedback.replace(/\n/g, "<br/>")}
      `;
      setMessage(htmlMessage);
      setError(false);

      setFeedback("");
      setRating(0);
    } catch (err) {
      console.error("Feedback submission error:", err);
      setMessage("Failed to submit feedback");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4">Feedback</h2>

      <div className="flex flex-col space-y-3 w-full">
        <textarea
          className="border p-2 rounded h-24 w-full"
          placeholder="Enter feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          className="border p-2 rounded w-full"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
        >
          Submit Feedback
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
