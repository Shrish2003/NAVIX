import React, { useEffect, useState } from 'react';
import geminiService from '../services/geminiService';

const InsightsPanel = ({ optimization }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!optimization) return;
      setLoading(true);
      try {
        const res = await geminiService.generateInsights(optimization);
        if (!mounted) return;
        setInsights(res);
      } catch (e) {
        if (!mounted) return;
        setInsights('Error generating insights: ' + e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [optimization]);

  return (
    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
      <p className="text-xs text-slate-400 mb-2">INSIGHTS</p>
      <div className="text-sm text-slate-200">
        {loading && <div className="text-slate-400">Generating insights...</div>}
        {!loading && insights && <div>{insights}</div>}
        {!loading && !insights && <div className="text-slate-500">No insights available</div>}
      </div>
    </div>
  );
};

export default InsightsPanel;
