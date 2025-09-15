import React from "react";

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "candidate", label: "Candidates" },
    { key: "interview", label: "Interviews" },
    { key: "preoffer", label: "Pre-Offers & Offers" },
    { key: "analytics", label: "Analytics" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
      {/* <div className="p-4 text-lg font-bold border-b border-gray-700">
        TalentAI
      </div> */}
      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveMenu(item.key)}
            className={`w-full text-left px-4 py-2 my-1 rounded hover:bg-gray-700 ${
              activeMenu === item.key ? "bg-gray-700" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
