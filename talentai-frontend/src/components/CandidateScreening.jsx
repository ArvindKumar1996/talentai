import React, { useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileWord } from "react-icons/fa";

export default function CandidateScreening({
  candidateIds = [],
  uploadedFiles = [],
  jobDescription,
  next,
  back,
}) {
  const [results, setResults] = useState([]); // store results per candidate
  const [loadingIndex, setLoadingIndex] = useState(null); // current candidate being processed

  const getFileIcon = (type) => {
    if (type.includes("pdf"))
      return <FaFilePdf className="text-red-500 mr-2" />;
    if (type.includes("word") || type.includes("officedocument"))
      return <FaFileWord className="text-blue-500 mr-2" />;
    return null;
  };

  const getFriendlyType = (type) => {
    if (type.includes("pdf")) return "PDF";
    if (type.includes("word") || type.includes("officedocument")) return "DOCX";
    return type.split("/")[1] || "File";
  };

  const handleScreenAll = async () => {
    if (!candidateIds.length || !jobDescription) {
      return alert("Missing candidates or job description");
    }

    const allResults = [];
    for (let i = 0; i < candidateIds.length; i++) {
      const id = candidateIds[i];
      setLoadingIndex(i);

      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/resume/screen",
          { candidateId: id, jobDescription }
        );

        const status = data.fitScore > 50 ? "Selected" : "Rejected";

        allResults.push({ ...data, candidateIndex: i, status });
        setResults([...allResults]);
      } catch (err) {
        console.error("Screening error for candidate", id, err);
        allResults.push({ error: true, candidateIndex: i, status: "Rejected" });
        setResults([...allResults]);
      }
    }

    setLoadingIndex(null);
  };

  const handleNext = () => {
    // take only selected resumes and preserve { id, name }
    const selectedCandidates = results
      .filter((r) => r.status === "Selected")
      .map((r) => {
        const id = candidateIds[r.candidateIndex];
        const name =
          uploadedFiles[r.candidateIndex]?.file?.name || `Resume_${id}`;
        return { id, name };
      });

    next(selectedCandidates); // pass objects, not just IDs
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Candidate Screening</h3>

      {/* Uploaded Files */}
      <h4 className="text-md font-semibold mb-2">Uploaded Resumes</h4>
      {uploadedFiles.map((f, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border p-2 rounded mb-2"
        >
          <div className="flex items-center">
            {getFileIcon(f.file.type)}
            <div>
              <p className="text-sm">{f.file.name}</p>
              <p className="text-xs text-gray-500">
                {Math.round(f.file.size / 1024)} KB -{" "}
                {getFriendlyType(f.file.type)}
              </p>
              {f.status === "uploaded" && (
                <p className="text-xs text-green-500">Uploaded</p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex space-x-2 my-4">
        <button onClick={back} className="bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={handleScreenAll}
          disabled={
            loadingIndex !== null || results.length === candidateIds.length
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loadingIndex !== null
            ? `Screening candidate ${loadingIndex + 1} of ${
                candidateIds.length
              }...`
            : results.length === candidateIds.length
            ? "Screening Done"
            : "Screen All"}
        </button>
        <button
          onClick={handleNext}
          disabled={results.length !== candidateIds.length}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-4">
        {results.map((res, idx) => (
          <div
            key={idx}
            className={`p-4 border rounded ${
              res.status === "Selected"
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            {res.error ? (
              <p className="text-red-500">
                Screening failed for this candidate
              </p>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">
                    <strong>Fit Score:</strong> {res.fitScore}%
                  </p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      res.status === "Selected"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {res.status}
                  </span>
                </div>
                <p>
                  <strong>Summary:</strong> {res.summary}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
