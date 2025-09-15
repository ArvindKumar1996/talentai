import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Loader from "./components/Loader";
import ChatFloating from "./components/ChatFloating";

import CandidatePage from "./components/CandidatePage";
import InterviewPage from "./components/InterviewPage";
import PreOfferPage from "./components/PreOfferPage";
import AnalyticsPage from "./components/AnalyticsPage";
import { Home } from "./components/Home";
export default function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard"); // default Dashboard
  const [loading, setLoading] = useState(false);

  const [jobData, setJobData] = useState(null);
  const [candidateId, setCandidateId] = useState(null);

  const handleNext = (page, data) => {
    if (data?.jobData) setJobData(data.jobData);
    if (data?.candidateId) setCandidateId(data.candidateId);
    setActiveMenu(page);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Home />;
      case "candidate":
        return (
          <CandidatePage
            setLoading={setLoading}
            jobData={jobData}
            onNext={(id) => handleNext("interview", { candidateId: id })}
          />
        );
      case "interview":
        return (
          <InterviewPage
            candidateId={candidateId}
            setLoading={setLoading}
            onNext={() => handleNext("preoffer")}
          />
        );
      case "preoffer":
        return (
          <PreOfferPage
            candidateId={candidateId}
            setLoading={setLoading}
            onNext={() => handleNext("analytics")}
          />
        );
      case "analytics":
        return (
          <AnalyticsPage
            candidateId={candidateId}
            jobData={jobData}
            setLoading={setLoading}
          />
        );
      default:
        return <div>Select a menu option</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden mt-16">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <main className="flex-1 p-4 overflow-auto relative bg-gray-50">
          {loading && <Loader />}
          {renderContent()}
        </main>
      </div>

      <Footer />
      <ChatFloating />
    </div>
  );
}
