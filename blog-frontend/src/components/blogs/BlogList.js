import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = process.env.API || 'http://localhost:8000';
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      const { data } = await axios.get(`${apiUrl}/api/blogs`,config);
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };
  const handleEditBlog = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  return (
    <div>
    <h2>All Blogs</h2>
    {blogs.map((blog) => (
      <div key={blog._id}>
        <h3>{blog.title}</h3>
        <p>{blog.content}</p>
        <p>By: {blog.author.username}</p>
        <p>By: {blog.author._id}{user?.id}</p>

        {user && user?.id === blog.author._id && user.role === "customer" && (  // Check if the logged-in user is the author
          <>
            <button onClick={() => handleEditBlog(blog._id)}>Edit</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </>
        )}
      </div>
    ))}
  </div>
  );
};

export default BlogList;
