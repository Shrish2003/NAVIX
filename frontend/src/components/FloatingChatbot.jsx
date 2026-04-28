import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import geminiService from '../services/geminiService';

const PRESET_QUESTIONS = [
  'Why this route?',
  'Which vehicle is best?',
  'What happens if traffic increases?',
];

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi, I am Navix AI Assistant. Ask me about route reasoning, vehicle choice, traffic, or weather impact.',
    },
  ]);
  const [question, setQuestion] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const optimizationContext = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('navix-last-optimization');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [messages.length]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = async (text) => {
    const outgoing = (text || question).trim();
    if (!outgoing) return;

    setMessages((current) => [...current, { role: 'user', text: outgoing }]);
    setQuestion('');
    setTyping(true);

    try {
      const reply = await geminiService.chatWithGemini(optimizationContext, outgoing);
      setMessages((current) => [...current, { role: 'assistant', text: reply }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: `I could not reach Gemini: ${error.message}` },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl text-white shadow-[0_18px_40px_rgba(14,165,233,0.35)] transition-transform duration-200 hover:scale-105"
        aria-label="Open Navix AI Assistant"
      >
        💬
      </button>

      <div
        className={`fixed bottom-24 right-6 z-[9999] w-[350px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        } ${isMinimized ? 'h-16' : 'h-[500px]'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 px-4">
          <div>
            <p className="text-sm font-semibold text-white">Navix AI Assistant</p>
            <p className="text-xs text-slate-400">Optimization insights and fleet intelligence</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMinimized((value) => !value)}
              className="rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              {isMinimized ? 'Maximize' : 'Minimize'}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex h-[calc(500px-4rem)] flex-col bg-slate-950">
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-slate-800 text-slate-100 rounded-bl-md border border-slate-700'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300">
                    AI is thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700 bg-slate-900 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {PRESET_QUESTIONS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => send(preset)}
                    className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-2 rounded-2xl border border-slate-700 bg-slate-950 p-2">
                <textarea
                  rows={1}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ask Navix AI..."
                  className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => send()}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={typing || !question.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(FloatingChatbot);
