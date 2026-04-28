// Simple Gemini integration service for frontend
// Uses REACT_APP_GEMINI_API_KEY from environment. Keep key secure in production.

const GEMINI_BASE = process.env.REACT_APP_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta2';
const GEMINI_MODEL = process.env.REACT_APP_GEMINI_MODEL || 'models/gemini-1.0';

async function callGemini(prompt, { temperature = 0.2, maxOutputTokens = 300 } = {}) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing Gemini API key in REACT_APP_GEMINI_API_KEY');

  const url = `${GEMINI_BASE}/${GEMINI_MODEL}:generateText`;
  const body = {
    prompt: { text: prompt },
    temperature,
    maxOutputTokens,
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error('Gemini API error: ' + txt);
  }

  const json = await resp.json();
  // attempt to read generated text in a few common fields
  if (json?.candidates && json.candidates[0]?.content) return json.candidates[0].content;
  if (json?.output?.[0]?.content?.[0]?.text) return json.output[0].content[0].text;
  if (json?.results && json.results[0]?.output) return json.results[0].output;
  return JSON.stringify(json);
}

function buildExplanationPrompt(data) {
  const v = data?.selected_vehicle || {};
  const parts = [];
  parts.push(`Selected vehicle: ${v.vehicle_id || 'N/A'}`);
  if (data.cost != null) parts.push(`Optimization cost: ${data.cost}`);
  if (v.speed != null) parts.push(`Speed: ${v.speed}`);
  if (v.distance != null) parts.push(`Distance: ${v.distance}`);
  if (v.traffic_factor != null) parts.push(`Traffic factor: ${v.traffic_factor}`);
  if (v.weather_factor != null) parts.push(`Weather factor: ${v.weather_factor}`);
  parts.push('Provide a concise human-readable explanation why this vehicle was selected based on the provided metrics. Keep it 1-3 sentences, actionable language, and avoid suggesting new routes.');
  return parts.join('\n');
}

export async function generateExplanation(data) {
  const prompt = buildExplanationPrompt(data);
  return callGemini(prompt, { temperature: 0.15, maxOutputTokens: 180 });
}

export async function chatWithGemini(data, userQuestion) {
  const ctx = buildExplanationPrompt(data);
  const prompt = `You are an assistant for a fleet optimization dashboard. Context:\n${ctx}\nUser question: ${userQuestion}\nAnswer concisely and helpfully.`;
  return callGemini(prompt, { temperature: 0.3, maxOutputTokens: 400 });
}

export async function generateInsights(data) {
  const v = data?.selected_vehicle || {};
  const prompt = `Given the optimization result and vehicle metrics (vehicle=${v.vehicle_id || 'N/A'}, cost=${data.cost}, traffic=${v.traffic_factor ?? v.traffic_factor}, weather=${v.weather_factor ?? v.weather_factor}, speed=${v.speed ?? v.speed}), list 3 short actionable insights (one sentence each) for the operator.`;
  return callGemini(prompt, { temperature: 0.2, maxOutputTokens: 240 });
}

const geminiService = { generateExplanation, chatWithGemini, generateInsights };
export default geminiService;
