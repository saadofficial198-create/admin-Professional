import { useEffect, useState } from 'react';
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#080f25',
  padding: '1rem',
};

const cardStyle = {
  width: '100%',
  maxWidth: '400px',
  backgroundColor: '#0b1739',
  borderRadius: '16px',
  padding: '2rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgb(255 255 255 / 27%)'
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '1.5rem',
  textAlign: 'center',
  color: '#ffffffff',
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '0.25rem',
  color: '#ffffffff',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  backgroundColor: '#0b1739',
  border: '1px solid rgb(255 255 255 / 27%)',
  marginBottom: '1rem',
  fontSize: '16px',
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '0.75rem',
  fontSize: '16px',
  fontWeight: '600',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token safely
      localStorage.setItem("token", data.token);
      alert("Login successful!");

      // Redirect or load admin dashboard
      window.location.href = "/"; // adjust route

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Admin Login</h2>
        <form>
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="Enter email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />

          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="Enter password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={buttonStyle} onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
