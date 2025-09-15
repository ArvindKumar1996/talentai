import React, { useState } from "react";
import Loader from "./Loader";
import { FaDownload } from "react-icons/fa";

export default function PreOfferPage() {
  const [candidateName, setCandidateName] = useState("");
  const [message, setMessage] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [offerGenerated, setOfferGenerated] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const sendPreOffer = async () => {
    if (!candidateName || !message) {
      setError(true);
      setInfoMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setInfoMessage("");
    setError(false);

    // Dummy API simulation
    setTimeout(() => {
      const dummyCandidateId = "61ccff80-de97-4520-be47-9cdac08a04bb";
      setCandidateId(dummyCandidateId);
      setStatus("Pre-offer sent successfully");
      setInfoMessage(
        `Pre-offer sent successfully! Candidate ID: ${dummyCandidateId}`
      );
      setError(false);
      setCandidateName("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  const generateOffer = async () => {
    if (!candidateId) {
      setError(true);
      setInfoMessage("Candidate ID required to generate offer");
      return;
    }

    setLoading(true);
    setInfoMessage("");
    setError(false);

    // Dummy offer generation
    setTimeout(() => {
      setOfferGenerated(true);
      setInfoMessage(
        `Offer generated successfully for Candidate ID: ${candidateId}`
      );

      // Dummy PDF preview URL
      const dummyPdfUrl =
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      setPreviewUrl(dummyPdfUrl);
      setShowModal(true);

      setLoading(false);
    }, 1000);
  };

  const downloadOffer = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `offer_${candidateId}.pdf`;
    a.click();
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto relative">
      {loading && <Loader />}

      <h2 className="text-xl font-bold mb-4">Pre-Offers & Offers</h2>

      {/* Send Pre-Offer */}
      <div className="bg-white p-6 rounded shadow mb-6 w-full">
        <h3 className="font-semibold mb-4">Send Pre-Offer</h3>
        <div className="flex flex-col space-y-3 w-full">
          <input
            type="text"
            placeholder="Candidate Name"
            className="border p-2 rounded w-full"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
          <textarea
            placeholder="Message"
            className="border p-2 rounded w-full h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendPreOffer}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Send Pre-Offer
          </button>
        </div>

        {infoMessage && (
          <div
            className={`mt-3 p-3 rounded border ${
              error
                ? "bg-red-100 border-red-400 text-red-700"
                : "bg-green-100 border-green-400 text-green-700"
            }`}
          >
            {infoMessage}
          </div>
        )}

        {status && <p className="mt-2">Status: {status}</p>}
      </div>

      {/* Generate Offer */}
      {candidateId && (
        <div className="bg-white p-6 rounded shadow w-full mb-6">
          <h3 className="font-semibold mb-3">Generate Offer</h3>
          <div className="flex gap-2">
            <button
              onClick={generateOffer}
              className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
              disabled={offerGenerated}
            >
              {offerGenerated ? "Offer Generated" : "Generate Offer"}
            </button>
            {offerGenerated && (
              <button
                onClick={downloadOffer}
                className="bg-gray-200 text-black px-4 py-2 rounded flex items-center justify-center hover:bg-gray-300"
              >
                <FaDownload className="mr-2" /> Download
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showModal && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 h-5/6 rounded shadow-lg relative flex flex-col">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red-500 font-bold px-3 py-1 rounded hover:bg-red-100"
            >
              Close
            </button>
            <iframe
              src={previewUrl}
              title="Offer Preview"
              className="flex-1 w-full rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
