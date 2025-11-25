"use client";
import { useEffect, useState } from 'react';

export default function NotesClient() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [q, setQ] = useState('');
  const [error, setError] = useState(null);

  function getToken() {
    return localStorage.getItem('token');
  }

  async function load() {
    setError(null);
    try {
      const res = await fetch(`http://localhost:4000/api/notes?q=${encodeURIComponent(q)}`, { headers: { Authorization: `Bearer ${getToken()}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setNotes(data.notes || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { load(); }, [q]);

  async function createNote(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` }, body: JSON.stringify({ title, content }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Create failed');
      setTitle(''); setContent('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    try {
      const res = await fetch(`http://localhost:4000/api/notes/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }
      load();
    } catch (err) { setError(err.message); }
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input className="form-input" placeholder="Search" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button className="px-3 py-2 border rounded" onClick={load}>Search</button>
      </div>
      <div className="card mb-4">
        <h5 className="text-lg font-medium mb-2">New Note</h5>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <form onSubmit={createNote} className="space-y-2">
          <div>
            <input className="form-input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div>
            <textarea className="form-input" placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} />
          </div>
          <div>
            <button className="btn-primary" type="submit">Create</button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {notes.map(n => (
          <div className="note-card" key={n.id}>
            <div>
              <h5 className="text-md font-semibold">{n.title}</h5>
              <p className="text-sm text-slate-700">{n.content}</p>
              <div className="mt-3 flex gap-2">
                <button className="px-2 py-1 text-sm text-white bg-red-600 rounded" onClick={()=>remove(n.id)}>Delete</button>
                <button className="px-2 py-1 text-sm border rounded" onClick={()=>{navigator.clipboard.writeText(n.content || '');}}>Copy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
