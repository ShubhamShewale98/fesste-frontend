import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const { blogId } = useParams(); 
  const [title, setTitle] = useState( '');
  const [content, setContent] = useState( '');
  console.log("blogId",blogId)
  const navigate = useNavigate();
  const apiUrl = process.env.API || 'http://localhost:8000';
useEffect(()=>{
      (async()=>{
        if(blogId){
          let data =         await axios.get(`${apiUrl}/api/blogs/${blogId}`);
          console.log("data",data.data)
          setTitle(data.data.title)
          setContent(data.data.content)
        }
       
      })()

},[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      if (blogId) {
        // Edit blog
        await axios.put(`${apiUrl}/api/blogs/${blogId}`, { title, content }, config);
      } else {
        // Create new blog
        await axios.post(`${apiUrl}/api/blogs`, { title, content }, config);
      }
      navigate('/');

      // onSave();
    } catch (err) {
      console.error('Failed to save blog:', err);
    }
  };

  return (
    <div>
      <h2>{blogId ? 'Edit Blog' : 'Create Blog'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
        <button type="submit">{blogId ? 'Update Blog' : 'Create Blog'}</button>
      </form>
    </div>
  );
};

export default BlogForm;
