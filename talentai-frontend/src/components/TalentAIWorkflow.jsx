import React from "react";

export const TalentAIWorkflow = () => {
  const steps = [
    "Upload Resumes",
    "AI Screening → Candidate & Score",
    "Resume Standardization",
    "Schedule Interviews",
    "Pre-Offer Connect",
  ];

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold text-indigo-600 text-center mb-8">
        TalentAI Workflow
      </h2>

      {/* Flex container with wrapping */}
      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step box */}
            <div className="flex flex-col items-center min-w-[160px]">
              <div className="bg-indigo-100 text-indigo-800 font-semibold px-4 py-3 rounded-lg shadow-md text-center">
                {step}
              </div>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="flex items-center">
                <span className="text-indigo-400 font-bold text-2xl animate-bounce">
                  →
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
