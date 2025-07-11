// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import bg from '../assets/user.jpg';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:8080/books/showBooks');
    setBooks(res.data);
  };

  const fetchBook = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/books/getBook/${isbn}`);
    setBook(res.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert("Book not found with this ISBN 📕");
      setBook(null); // clear previous book
    } else {
      console.error("Error fetching book:", error);
      alert("Something went wrong 😓");
    }
  }
};


  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/');  
};


  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div
      className="user-dashboard"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay">
        <div className="top-bar">
          <h2>User Dashboard</h2>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="search-box">
          <input
            placeholder="Enter ISBN"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
          />
          <button onClick={fetchBook}>Search Book</button>
        </div>

        {book && (
  <div className="book-detail">
    <h3>Book Details</h3>
    <table className="book-detail-table">
      <tbody>
          <tr>
          <th>ISBN</th>
          <td>{book.isbn}</td>
        </tr>
        <tr>
          <th>Title</th>
          <td>{book.title}</td>
        </tr>
        <tr>
          <th>Author</th>
          <td>{book.author}</td>
        </tr>
        <tr>
          <th>Genre</th>
          <td>{book.genre}</td>
        </tr>
        <tr>
          <th>Year</th>
          <td>{book.publicationYear}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td>₹{book.price}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}


<h3>All Books</h3>
<table className="book-table">
  <thead>
    <tr>
    <th>ISBN</th>
      <th>Title</th>
      <th>Author</th>
      <th>Genre</th>
      <th>Year</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {books.map(book => (
      <tr key={book.isbn}>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.publicationYear}</td>
        <td>₹{book.price}</td>
      </tr>
    ))}
  </tbody>
</table>



      </div>
    </div>
  );
};

export default UserDashboard;
