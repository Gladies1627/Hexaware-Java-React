import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
import bg from '../assets/register.jpg'; 

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    roles: 'ROLE_USER'
  });

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:8080/auth/addNewUser', user);
    alert('User registered successfully!');
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <div className="footer-text">
          Already a user? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
