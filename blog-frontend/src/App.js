import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BlogList from './components/blogs/BlogList';
import BlogForm from './components/blogs/BlogForm';
import UserList from './components/users/UserList';
import Navbar from './components/common/Navbar';

function App() {
  return (
   <>
    
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/create-blog" element={<BlogForm />} />
          <Route path="/edit-blog/:blogId" element={<BlogForm />} />
          <Route path="/admin/users" element={<UserList />} />
        </Routes>
    
   </>
  );
}

export default App;
