import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './blogList.module.css'; // Import the CSS module
import Modal from '../common/Modal';
import { useSnackbar } from 'notistack';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const apiUrl = process.env.API || 'http://localhost:8000';

  useEffect(() => {
    const fetchBlogs = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      try {
        const { data } = await axios.get(`${apiUrl}/api/blogs`, config);
        setBlogs(data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

 
  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;
    console.log("blogToDelete",blogToDelete)
    try {
      await axios.delete(`${apiUrl}/api/blogs/${blogToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogToDelete));
      enqueueSnackbar(`Blog Deleted Successfuly`,{
        variant:'success'
      })
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to delete user:', err);
      enqueueSnackbar(`${err}`,{
        variant:'error'
      })
    }
  };
  const openModal = (blogID) => {
    setBlogToDelete(blogID);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBlogToDelete(null);
  };
  const handleEditBlog = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  return (
    <div className={styles.blogContainer}>
      <h2>All Blogs</h2>
      {blogs.length > 0 && blogs.map((blog) => (
        <div key={blog._id} className={styles.blogItem}>
          <h3 className={styles.blogTitle}>Title:{blog.title}</h3>
          <p className={styles.blogContent}>Blog:{blog.content}</p>
          <p className={styles.blogAuthor}>By: {blog.author?.username}</p>
          
          {user && user.id === blog.author?._id && user.role === "customer" && (
            <div className={styles.blogButtons}>
              <button onClick={() => handleEditBlog(blog._id)} className={styles.blogButton}>
                Edit
              </button>
              <button onClick={() => openModal(blog._id)} className={`${styles.blogButton} ${styles.blogDeleteButton}`}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteBlog}
        message="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default BlogList;
