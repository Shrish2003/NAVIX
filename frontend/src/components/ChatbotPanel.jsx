import React, { useState } from 'react';
import geminiService from '../services/geminiService';

const ChatbotPanel = ({ optimization }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!question) return;
    const userMsg = { role: 'user', text: question };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const reply = await geminiService.chatWithGemini(optimization, question);
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: 'Error: ' + e.message }]);
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 h-full flex flex-col">
      <p className="text-xs text-slate-400 mb-2">AI ASSISTANT</p>
      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded bg-slate-800 p-2 text-sm text-white"
          placeholder="Ask: Why this route?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
        />
        <button className="px-3 py-2 bg-blue-500 rounded" onClick={send} disabled={loading}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  );
};

export default ChatbotPanel;
