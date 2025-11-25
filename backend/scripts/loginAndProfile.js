(async ()=>{
  try {
    const login = await fetch('http://localhost:4000/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'tester2@example.com', password: 'password123' }) });
    const data = await login.json();
    console.log('login:', data.token ? 'ok' : data);
    const profile = await fetch('http://localhost:4000/api/profile', { headers: { Authorization: `Bearer ${data.token}` } });
    console.log('profile status', profile.status);
    console.log(await profile.json());
  } catch (err) { console.error(err); }
})();
