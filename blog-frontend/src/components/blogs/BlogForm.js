import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './blogForm.module.css'; // Import the CSS module
import { useSnackbar } from 'notistack';

const BlogForm = () => {
  const { blogId } = useParams(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const apiUrl = process.env.API || 'http://localhost:8000';

  useEffect(() => {
    const fetchBlog = async () => {
      if (blogId) {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        try {
          const { data } = await axios.get(`${apiUrl}/api/blogs/${blogId}`, config);
          setTitle(data.title);
          setContent(data.content);
        } catch (err) {
          console.error('Failed to fetch blog:', err);
        }
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      if (blogId) {
        // Edit blog
        await axios.put(`${apiUrl}/api/blogs/${blogId}`, { title, content }, config);
        enqueueSnackbar(`Blog updated successfully`,{
          variant:'success'
        })
      } else {
        // Create new blog
        await axios.post(`${apiUrl}/api/blogs`, { title, content }, config);
        enqueueSnackbar(`Blog created successfully`,{
          variant:'success'
        })
      }
      navigate('/');

    } catch (err) {
      console.error('Failed to save blog:', err);
      
      enqueueSnackbar(`${err.response.data.message}`,{
        variant:'error'
      })
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2>{blogId ? 'Edit Blog' : 'Create Blog'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            {blogId ? 'Update Blog' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
