import React, { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import jsPDF from "jspdf";

export default function StandardizedResume({
  candidateIds = [],
  uploadedFiles = [],
  back,
}) {
  const [resumes, setResumes] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [previewAlias, setPreviewAlias] = useState("");

  const handleFetchAll = async () => {
    if (!candidateIds.length) {
      return alert("No candidates to standardize");
    }
    setLoading(true);
    const results = {};
    try {
      for (let i = 0; i < candidateIds.length; i++) {
        const candidateId = candidateIds[i];
        const { data } = await axios.get(
          `http://localhost:8080/api/resume/standardize/${candidateId}`
        );
        results[candidateId] = data;
      }
      setResumes(results);
    } catch (err) {
      console.error("Fetch standardized resumes error:", err);
      alert("Failed to fetch standardized resumes");
    }
    setLoading(false);
  };

  const extractAliasName = (resumeText) => {
    if (!resumeText) return null;
    const match = resumeText.match(/Candidate Name:\s*(.+)/i);
    return match ? match[1].trim() : null;
  };

  const handleDownloadPDF = (resumeText, baseName, aliasName) => {
    const doc = new jsPDF();

    // Add Logo (replace with your logo path or base64)
    const logoUrl = "/jade-logo.png"; // put logo in public/logo.png
    doc.addImage(logoUrl, "PNG", 10, 10, 30, 30);

    // Title
    doc.setFontSize(14);
    doc.text("Standardized Resume", 50, 20);

    if (aliasName) {
      doc.setFontSize(12);
      doc.text(`Candidate: ${aliasName}`, 50, 28);
    }

    // Resume text
    doc.setFontSize(10);
    doc.text(resumeText, 10, 50, { maxWidth: 180 });

    // Save
    doc.save(`${baseName.replace(/\s+/g, "_")}_standardized.pdf`);
  };

  const handleDownloadAll = () => {
    Object.entries(resumes).forEach(([candidateId, resumeText]) => {
      const file = uploadedFiles.find((f) => f.candidateId === candidateId);
      const aliasName = extractAliasName(resumeText);
      const baseName =
        aliasName ||
        (file ? file.fileName.replace(/\.[^/.]+$/, "") : candidateId);

      handleDownloadPDF(resumeText, baseName, aliasName);
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow relative">
      {loading && <Loader />}
      <h3 className="text-lg font-bold mb-4">Standardized Resume</h3>

      {/* Buttons */}
      <div className="flex space-x-2 mb-4">
        <button onClick={back} className="bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={handleFetchAll}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Standardizing..." : "Standardize All Resumes"}
        </button>
        {Object.keys(resumes).length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download All (PDF)
          </button>
        )}
      </div>

      {/* Table */}
      {candidateIds.length === 0 ? (
        <p>No resumes available</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Resume Name (Alias)</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Preview</th>
              <th className="border px-4 py-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {candidateIds.map((candidateId, idx) => {
              const file = uploadedFiles[idx];
              const fileName = file?.fileName || `Candidate_${candidateId}`;
              const aliasName = extractAliasName(resumes[candidateId]);

              return (
                <tr key={idx} className="border-b">
                  <td className="p-2">{aliasName || fileName}</td>
                  <td className="p-2">
                    {resumes[candidateId] ? (
                      <span className="text-green-600">Standardized</span>
                    ) : (
                      <span className="text-gray-500">Pending</span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {resumes[candidateId] ? (
                      <button
                        onClick={() => {
                          setPreviewContent(resumes[candidateId]);
                          setPreviewAlias(aliasName || fileName);
                          setPreviewOpen(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Preview
                      </button>
                    ) : (
                      <span className="text-gray-400">Disabled</span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {resumes[candidateId] ? (
                      <button
                        onClick={() => {
                          const baseName =
                            aliasName ||
                            fileName.replace(/\.[^/.]+$/, "") ||
                            candidateId;
                          handleDownloadPDF(
                            resumes[candidateId],
                            baseName,
                            aliasName
                          );
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Download PDF
                      </button>
                    ) : (
                      <span className="text-gray-400">Disabled</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-h-[80vh] p-6 overflow-auto relative">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Logo */}
            <img src="/jade-logo.png" alt="Logo" className="h-12 mb-4" />

            <h2 className="text-lg font-bold mb-4">
              Resume Preview - {previewAlias}
            </h2>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
              {previewContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
