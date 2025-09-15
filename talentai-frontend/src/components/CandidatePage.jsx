import React, { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import LinkedInUpload from "./LinkedInUpload";
import CandidateScreening from "./CandidateScreening";
import StandardizedResume from "./StandardizedResume";
import JobEnrichmentPage from "./JobEnrichmentPage";

export default function CandidatePage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Lift state to persist across steps
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [candidateIds, setCandidateIds] = useState([]);
  const [jobDescription, setJobDescription] = useState("");

  // Store only selected candidates from screening (with fitScore ≥ 50)
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <JobEnrichmentPage
            onNext={(jd) => {
              setJobDescription(jd.enrichedDescription || jd);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <ResumeUpload
            next={(files, ids) => {
              setUploadedFiles(files);
              setCandidateIds(ids);
              setCurrentStep(3);
            }}
            initialFiles={uploadedFiles}
          />
        );
      case 3:
        return (
          <LinkedInUpload
            next={() => setCurrentStep(4)}
            back={() => setCurrentStep(2)}
            uploadedFiles={uploadedFiles}
            candidateIds={candidateIds}
          />
        );
      case 4:
        return (
          <CandidateScreening
            candidateIds={candidateIds}
            uploadedFiles={uploadedFiles}
            jobDescription={jobDescription}
            back={() => setCurrentStep(3)}
            next={(selected) => {
              setSelectedCandidates(selected); // store only selected resumes
              setCurrentStep(5);
            }}
          />
        );
      case 5:
        return (
          <StandardizedResume
            candidateIds={candidateIds}
            uploadedFiles={uploadedFiles}
            back={() => setCurrentStep(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Stepper */}
      <div className="flex mb-6">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full ${
                currentStep >= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step}
            </div>
            <div className="mt-1 text-xs">
              {step === 1
                ? "Job Enrichment"
                : step === 2
                ? "Upload Resume"
                : step === 3
                ? "LinkedIn"
                : step === 4
                ? "Screening"
                : "Standardized Resume"}
            </div>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div>{renderStep()}</div>
    </div>
  );
}
