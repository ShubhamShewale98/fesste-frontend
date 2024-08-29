import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import styles from './userList.module.css'; // Import the CSS module
import Modal from '../common/Modal';
import { useSnackbar } from 'notistack';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const apiUrl = process.env.API || 'http://localhost:8000';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if(!userToDelete)return
    try {
      await axios.delete(`${apiUrl}/api/users/${userToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(users.filter((user) => user._id !== userToDelete));
      enqueueSnackbar(`Customer Deleted Successfuly`,{
        variant:'success'
      })
      
    } catch (err) {
      console.error('Failed to delete user:', err);
      
      enqueueSnackbar(`${err}`,{
        variant:'error'
      })
    }
    setIsModalOpen(false);
  };
  const openModal = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };
  if (!user || user.role !== 'admin') {
    return <p className={styles.noPermission}>You do not have permission to view this page.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>All Customers</h2>
        {users?.length > 0 && users.map((user) => (
          <div key={user._id} className={styles.userItem}>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Customer Name: {user.username}</p>
              <p className={styles.userEmail}>Customer Email: {user.email}</p>
            </div>
            {user.role === 'customer' && (
              <button onClick={() => openModal(user._id)} className={styles.deleteButton}>
                Delete Customer
              </button>
            )}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteUser}
        message="Are you sure you want to delete this customer?"
      />
    </div>
  );
};

export default UserList;
