import React from "react";

const Sidebar = ({ activeTab = "dashboard", onTabChange = () => {} }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "vehicles", label: "Vehicles", icon: "🚗" },
    { id: "routes", label: "Routes", icon: "🛣️" },
    { id: "optimization", label: "Optimization", icon: "⚡" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-blue-400">🗺️</span> Navix
        </h1>
        <p className="text-sm text-slate-400 mt-1">Fleet Intelligence</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <div className="text-xs text-slate-500">
          <p>Status: <span className="text-green-400 font-semibold">Live</span></p>
          <p className="mt-1">Version: 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
