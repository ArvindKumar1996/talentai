import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import {
  FaFilePdf,
  FaFileWord,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";

export default function ResumeUpload({ next, back, initialFiles = [] }) {
  const [files, setFiles] = useState(initialFiles);
  const [loading, setLoading] = useState(false);
  const [candidateIds, setCandidateIds] = useState([]);

  useEffect(() => {
    if (initialFiles.length > 0) {
      setCandidateIds(initialFiles.map((f) => f.candidateId || null));
    }
  }, [initialFiles]);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      progress: 0,
      status: "pending",
      candidateId: null,
    }));
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      file,
      progress: 0,
      status: "pending",
      candidateId: null,
    }));
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setCandidateIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Select at least one file");
    setLoading(true);

    const uploadedIds = [...candidateIds];

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === "uploaded") continue;

      const formData = new FormData();
      formData.append("file", files[i].file);

      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/resume/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setFiles((prev) => {
                const newFiles = [...prev];
                newFiles[i].progress = progress;
                return newFiles;
              });
            },
          }
        );

        setFiles((prev) => {
          const newFiles = [...prev];
          newFiles[i].status = "uploaded";
          newFiles[i].candidateId = data.candidateId;
          return newFiles;
        });

        uploadedIds[i] = data.candidateId;
      } catch (err) {
        console.error("Upload error:", err);
        setFiles((prev) => {
          const newFiles = [...prev];
          newFiles[i].status = "failed";
          return newFiles;
        });
      }
    }

    setLoading(false);

    if (uploadedIds.filter(Boolean).length > 0) {
      setCandidateIds(uploadedIds);
      next(files, uploadedIds);
    } else {
      alert("No candidate IDs returned from server");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow relative">
      {loading && <Loader />}
      <h3 className="text-lg font-bold mb-4">Upload Resumes</h3>

      {/* Cloud Upload Area */}
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-10 mb-4 cursor-pointer hover:border-blue-500 transition"
        onClick={() => document.getElementById("fileInput").click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt className="text-5xl text-gray-400 mb-4" />
        <p className="text-gray-600">
          Drag & drop files here, or click to select
        </p>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* File List */}
      <div className="mb-4">
        {files.map((f, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border p-2 rounded mb-2"
          >
            <div className="flex items-center">
              {f.file.type.includes("pdf") ? (
                <FaFilePdf className="text-red-500 mr-2" />
              ) : f.file.type.includes("word") ||
                f.file.type.includes("officedocument") ? (
                <FaFileWord className="text-blue-500 mr-2" />
              ) : (
                <FaTimes className="mr-2" />
              )}
              <div>
                <p className="text-sm">{f.file.name}</p>
                <p className="text-xs text-gray-500">
                  {Math.round(f.file.size / 1024)} KB
                </p>
                {f.status === "uploaded" && (
                  <p className="text-xs text-green-500">Uploaded</p>
                )}
                {f.status === "failed" && (
                  <p className="text-xs text-red-500">Failed</p>
                )}
                {f.status === "pending" && (
                  <div className="w-full bg-gray-200 h-1 rounded mt-1">
                    <div
                      className="h-1 rounded"
                      style={{
                        width: `${f.progress}%`,
                        background: `linear-gradient(to right, #4ade80, #22d3ee)`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => removeFile(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={back}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleUpload}
          disabled={loading || files.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Proceed"}
        </button>
      </div>
    </div>
  );
}
