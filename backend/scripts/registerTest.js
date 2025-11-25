const data = { email: 'tester@example.com', password: 'password123', name: 'Tester' };
(async ()=>{
  try {
    const res = await fetch('http://localhost:4000/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    console.log('status', res.status);
    console.log(json);
  } catch (err) {
    console.error(err);
  }
})();
