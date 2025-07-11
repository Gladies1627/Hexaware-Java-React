import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bg from '../assets/home.jpg'; 

const Home = () => (
  <div className="home-container" style={{ backgroundImage: `url(${bg})` }}>
    <div className="overlay">
      <h1>Book Management System</h1>
      <div className="nav-links">
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </div>
    </div>
  </div>
);

export default Home;
