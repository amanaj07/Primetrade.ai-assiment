"use client";
import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DebugApi() {
  const [output, setOutput] = useState('');

  async function testRegister() {
    setOutput('Running register...');
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: `webtest+${Date.now()}@example.com`, password: 'password123', name: 'WebTest' })
      });
      const text = await res.text();
      setOutput(`status ${res.status}\n${text}`);
    } catch (err) { setOutput('Network error: ' + err.message); }
  }

  async function testLogin() {
    setOutput('Running login...');
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'tester2@example.com', password: 'password123' })
      });
      const text = await res.text();
      setOutput(`status ${res.status}\n${text}`);
    } catch (err) { setOutput('Network error: ' + err.message); }
  }

  return (
    <div className="min-h-[60vh] flex items-start justify-center py-8">
      <div className="w-full max-w-2xl">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">API Debug</h3>
          <p className="text-sm text-slate-600 mb-4">Use these buttons to run test requests from your browser and inspect responses.</p>
          <div className="flex gap-2 mb-4">
            <button className="btn-primary" onClick={testRegister}>Test Register</button>
            <button className="px-3 py-2 border rounded" onClick={testLogin}>Test Login</button>
          </div>
          <pre className="bg-slate-100 p-3 rounded text-sm overflow-auto">{output}</pre>
        </div>
      </div>
    </div>
  );
}
