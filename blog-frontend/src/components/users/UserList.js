import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
const apiUrl = process.env.API || 'http://localhost:8000';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`${apiUrl}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div>
      <h2>All Customer</h2>
      {users.map((user) => (
        <div key={user._id}>
          <p> Customer Name : {user.username}</p>
          <p>Customer email - {user.email}</p>

          {user.role === 'customer' && <button onClick={() => handleDeleteUser(user._id)}>Delete Customer</button>}
        </div>
      ))}
    </div>
  );
};

export default UserList;
