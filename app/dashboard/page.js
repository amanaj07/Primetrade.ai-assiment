"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NotesClient from '../components/NotesClient';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  function getToken() { return localStorage.getItem('token'); }

  useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    fetch('http://localhost:4000/api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.user) setProfile(d.user); else router.push('/login'); })
      .catch(() => router.push('/login'));
  }, []);

  function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Dashboard</h3>
        <div className="flex items-center gap-4">
          {profile && <span className="text-sm text-slate-600">Signed in as <strong className="text-slate-900">{profile.email}</strong></span>}
          <button className="px-3 py-2 border rounded" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <NotesClient />
        </div>
        <div>
          <div className="card">
            <h5 className="text-lg font-medium mb-2">Profile</h5>
            {profile ? (
              <div className="text-sm text-slate-700">
                <p><strong>Name:</strong> {profile.name || '—'}</p>
                <p><strong>Email:</strong> {profile.email}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
