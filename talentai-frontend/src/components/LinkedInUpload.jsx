import React, { useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileWord } from "react-icons/fa";

export default function LinkedInUpload({
  uploadedFiles = [],
  candidateIds = [],
  next,
  back,
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (url) {
        await axios.post("http://localhost:8080/api/resume/linkedin", {
          profileUrl: url,
          candidateIds,
        });
        alert("LinkedIn uploaded successfully");
        setUrl("");
      }
      next(); // proceed regardless of URL
    } catch (err) {
      console.error(err);
      alert("LinkedIn upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h3 className="text-lg font-bold mb-4">Uploaded Resumes</h3>
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

      <h3 className="text-lg font-bold mt-4 mb-2">Upload LinkedIn Profile</h3>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://linkedin.com/in/..."
        className="mb-4 w-full border px-2 py-1 rounded"
      />

      {/* Buttons: Back, Skip, Next */}
      <div className="flex space-x-2">
        <button
          onClick={back}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={() => next()} // Skip LinkedIn
          disabled={loading}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Skip
        </button>
        <button
          onClick={handleUpload} // Upload LinkedIn then next
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Next"}
        </button>
      </div>
    </div>
  );
}
