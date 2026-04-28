import React, { memo, useEffect, useState } from "react";
import geminiService from "../services/geminiService";
import InsightsPanel from "./InsightsPanel";

const OptimizationPanel = ({ optimization = null, isLoading = false }) => {
  const selectedVehicle = optimization?.selected_vehicle;
  const selectedVehicleLabel =
    typeof selectedVehicle === "string"
      ? selectedVehicle
      : selectedVehicle?.vehicle_id || "-";
  const reasoning = optimization?.reasoning || optimization?.reason || "No reasoning available";
  const ranking = optimization?.alternatives || optimization?.ranking || [];
  const [aiReasoning, setAiReasoning] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function gen() {
      if (!optimization) return;
      setLoadingAi(true);
      try {
        const res = await geminiService.generateExplanation(optimization);
        if (!mounted) return;
        setAiReasoning(res);
      } catch (e) {
        if (!mounted) return;
        setAiReasoning('Error generating explanation: ' + e.message);
      } finally {
        if (mounted) setLoadingAi(false);
      }
    }
    gen();
    return () => { mounted = false; };
  }, [optimization]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-3xl mb-3">⚡</div>
          <p className="text-slate-400">Computing optimization...</p>
        </div>
      </div>
    );
  }

  if (!optimization) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg">No optimization data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-bold text-white">Optimization Result</h2>
        <p className="text-sm text-slate-400 mt-1">Fleet Intelligence Analysis</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Selected Vehicle */}
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg p-4 border border-blue-500/30">
          <p className="text-xs text-slate-400 mb-2">SELECTED VEHICLE</p>
          <p className="text-3xl font-bold text-blue-400">{selectedVehicleLabel}</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <p className="text-sm text-slate-300">Optimal choice for current conditions</p>
          </div>
        </div>

        {/* Optimization Cost */}
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 rounded-lg p-4 border border-emerald-500/30">
          <p className="text-xs text-slate-400 mb-2">OPTIMIZATION COST</p>
          <p className="text-3xl font-bold text-emerald-400">
            {typeof optimization.cost === "number" ? optimization.cost.toFixed(2) : "-"}
          </p>
          <p className="text-sm text-slate-300 mt-2">
            Lower cost = Better efficiency
          </p>
        </div>

        {/* Reasoning */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-3">REASONING</p>
          <p className="text-sm text-slate-200 leading-relaxed">
            {loadingAi ? 'Generating AI explanation...' : (aiReasoning || reasoning)}
          </p>
        </div>

        {/* Alternatives */}
        {ranking && ranking.length > 0 && (
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-400 mb-3">VEHICLE RANKING</p>
            <div className="space-y-2">
              {ranking.map((alt) => (
                <div
                  key={alt.vehicle_id}
                  className="flex items-center justify-between bg-slate-800 rounded p-2"
                >
                  <span className="text-sm text-slate-300">{alt.vehicle_id || alt.vehicle?.vehicle_id || "-"}</span>
                  <span className="text-sm text-slate-400">
                    Cost: {typeof alt.cost === "number" ? alt.cost.toFixed(2) : "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics Breakdown */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-3">OPTIMIZATION FACTORS</p>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Speed Efficiency</span>
                <span className="text-xs text-emerald-400">85%</span>
              </div>
              <div className="bg-slate-800 rounded h-2">
                <div className="bg-emerald-500 h-2 rounded w-[85%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Traffic Avoidance</span>
                <span className="text-xs text-blue-400">60%</span>
              </div>
              <div className="bg-slate-800 rounded h-2">
                <div className="bg-blue-500 h-2 rounded w-[60%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Weather Impact</span>
                <span className="text-xs text-cyan-400">80%</span>
              </div>
              <div className="bg-slate-800 rounded h-2">
                <div className="bg-cyan-500 h-2 rounded w-[80%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <InsightsPanel optimization={optimization} />

        {/* Timestamp */}
        <div className="text-xs text-slate-500 text-center pt-2">
          Last computed: {optimization.timestamp ? new Date(optimization.timestamp).toLocaleTimeString() : "just now"}
        </div>
      </div>
    </div>
  );
};

export default memo(OptimizationPanel);
