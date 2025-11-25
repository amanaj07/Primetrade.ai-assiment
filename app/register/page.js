"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function validateEmail(e) { return /\S+@\S+\.\S+/.test(e); }

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState({ ok: null, text: 'Checking...' });

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch(`${API}/`, { method: 'GET' });
        if (cancelled) return;
        if (res.ok) setApiStatus({ ok: true, text: 'API reachable' });
        else setApiStatus({ ok: false, text: `API responded ${res.status}` });
      } catch (err) {
        if (cancelled) return;
        setApiStatus({ ok: false, text: 'Network unreachable' });
      }
    }
    check();
    return () => { cancelled = true; };
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    // client-side validation
    if (!validateEmail(email)) { setError('Enter a valid email'); return; }
    if (!password || password.length < 6) { setError('Password must be at least 6 characters'); return; }

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const text = await res.text();
      let data = {};
      try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }
      if (!res.ok) {
        setError(`Error ${res.status}: ${data.error || data.raw || 'Register failed'}`);
        return;
      }
      if (!data.token) { setError('No token returned'); return; }
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="card fade-in">
            <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
            <p className="text-sm muted mb-4">Sign up to start creating notes and managing your profile.</p>
            <div className="mb-3 flex items-center gap-3">
              <div className="text-sm muted">{apiStatus.text}</div>
              {apiStatus.ok === false && (
                <button onClick={() => { setApiStatus({ ok: null, text: 'Checking...' }); fetch(`${API}/`).then(r=>setApiStatus({ ok: r.ok, text: r.ok? 'API reachable': `API ${r.status}` })).catch(()=>setApiStatus({ ok: false, text: 'Network unreachable' })); }} className="px-2 py-1 border rounded text-sm">Retry</button>
              )}
            </div>
            {error && <div className="mb-3 text-red-600">{error} {apiStatus.ok === false ? '— check backend and CORS or use /debug-api' : ''}</div>}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <button className="btn-primary" type="submit">Create account</button>
                <a href="/login" className="text-sm text-sky-600">Already have an account?</a>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#fff7ed,#fde68a)' }}>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-2">Join NextAuthApp</h3>
              <p className="muted">Create an account to save notes and access your personal dashboard anywhere.</p>
              <div className="mt-6">
                <div className="card">
                  <p className="text-sm muted">Why sign up?</p>
                  <ul className="text-sm mt-2">
                    <li>Secure storage</li>
                    <li>Quick search</li>
                    <li>User profile</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
