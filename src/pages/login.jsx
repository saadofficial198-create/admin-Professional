const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f3f4f6',
  padding: '1rem',
};

const cardStyle = {
  width: '100%',
  maxWidth: '400px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '2rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '1.5rem',
  textAlign: 'center',
  color: '#1f2937',
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '0.25rem',
  color: '#374151',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
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
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Admin Login</h2>
        <form>
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="Enter email" style={inputStyle} />

          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="Enter password" style={inputStyle} />

          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
