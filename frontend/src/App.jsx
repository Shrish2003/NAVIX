import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import FloatingChatbot from "./components/FloatingChatbot";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const contentRef = useRef(null);

  useEffect(() => {
    const savedScrollTop = Number(sessionStorage.getItem("navix-scroll-top") || 0);
    const node = contentRef.current;
    if (node && savedScrollTop > 0) {
      node.scrollTop = savedScrollTop;
    }
  }, []);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const handleScroll = () => {
      sessionStorage.setItem("navix-scroll-top", String(node.scrollTop));
    };

    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "vehicles":
        return <Vehicles />;
      case "routes":
        return (
          <div className="h-full flex items-center justify-center text-slate-400">
            <div className="text-center">
              <p className="text-2xl mb-2">🛣️</p>
              <p>Routes module coming soon</p>
            </div>
          </div>
        );
      case "optimization":
        return (
          <div className="h-full flex items-center justify-center text-slate-400">
            <div className="text-center">
              <p className="text-2xl mb-2">⚡</p>
              <p>Optimization details coming soon</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="flex-shrink-0 h-16 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 flex items-center px-6">
          <h1 className="text-xl font-bold text-white">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm text-slate-400">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              System Live
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div ref={contentRef} className="flex-1 overflow-auto p-6 scroll-smooth">
          {renderPage()}
        </div>
      </div>

      <FloatingChatbot />
    </div>
  );
}

export default App;
