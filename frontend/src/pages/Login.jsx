import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      onLogin(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      background: 'rgba(255,255,255,0.15)',
      borderRadius: 16,
      boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
      padding: 32,
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1.5px solid rgba(255,255,255,0.3)',
      minWidth: 320,
      maxWidth: 400,
      margin: '40px auto',
    }}>
      {error && <div style={{color:'red', textAlign:'center'}}>{error}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{padding:10, borderRadius:4, border:'1px solid #ccc'}} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{padding:10, borderRadius:4, border:'1px solid #ccc'}} />
      <button type="submit" style={{padding:10, borderRadius:4, background:'#007bff', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>Login</button>
    </form>
  );
}
