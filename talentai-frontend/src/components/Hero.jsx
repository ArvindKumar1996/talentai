import React from "react";
import { CanvasIllustrations } from "./CanvasIllustrations";

export const Hero = () => {
  return (
    <div className="relative h-96 flex flex-col justify-center items-center text-center">
      {/* Canvas in the background */}
      <div className="absolute inset-0">
        <CanvasIllustrations />
      </div>

      {/* Content above canvas */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold">
          Transforming Talent Acquisition with AI
        </h1>
        <p className="mt-2 text-lg">
          Streamline resume screening, interview scheduling, and post-offer
          engagement
        </p>
        <div className="mt-4 space-x-4 text-white">
          <button className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
            Screen Resume
          </button>
        </div>
      </div>
    </div>
  );
};
