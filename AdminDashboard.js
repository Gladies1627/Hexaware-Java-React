import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import bg from '../assets/admin.jpg';

const AdminDashboard = () => {
  const [tab, setTab] = useState('add');
  const [book, setBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
    price: ''
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/books/getBook/${book.isbn}`);
      setBook(res.data);
    } catch (err) {
      alert('Book not found!');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (tab === 'add') {
        await axios.post('http://localhost:8080/books/addBook', book);
        alert('Book added successfully!');
      } else if (tab === 'update') {
        await axios.put('http://localhost:8080/books/updateBook', book);
        alert('Book updated successfully!');
      } else if (tab === 'delete') {
        await axios.delete(`http://localhost:8080/books/deleteBook/${book.isbn}`);
        alert('Book deleted successfully!');
      }
      setBook({ isbn: '', title: '', author: '', publicationYear: '', genre: '', price: '' });
    } catch (err) {
      alert('Operation failed. Check console.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="admin-dashboard" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <div className="top-bar">
          <h2>Admin Dashboard</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="tabs">
          <button onClick={() => setTab('add')} className={tab === 'add' ? 'active' : ''}>Add Book</button>
          <button onClick={() => setTab('update')} className={tab === 'update' ? 'active' : ''}>Update Book</button>
          <button onClick={() => setTab('delete')} className={tab === 'delete' ? 'active' : ''}>Delete Book</button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input name="isbn" value={book.isbn} onChange={handleChange} placeholder="ISBN" required />

         {tab === 'update' && (
  <button type="button" onClick={fetchBook} className="fetch-btn">Fetch Book</button>
)}


          {(tab === 'add' || tab === 'update') && (
            <>
              <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
              <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
              <input name="publicationYear" value={book.publicationYear} onChange={handleChange} placeholder="Year" type="number" required />
              <input name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" required />
              <input name="price" value={book.price} onChange={handleChange} placeholder="Price" type="number" required />
            </>
          )}

          <button type="submit">{tab === 'add' ? 'Add' : tab === 'update' ? 'Update' : 'Delete'} Book</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
