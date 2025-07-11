import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import bg from '../assets/register.jpg'; 

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/generateToken', credentials, {
        headers: { 'Content-Type': 'application/json' }
      });

      const token = res.data;
      localStorage.setItem('token', token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      navigate(role === 'ROLE_ADMIN' ? '/admin' : '/user');

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + (error.response?.data || "Unauthorized"));
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg})` }}>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <div className="footer-text">
          Not registered? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
