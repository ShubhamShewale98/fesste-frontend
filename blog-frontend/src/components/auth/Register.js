import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './register.module.css'; // Import the CSS module

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password, role);
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerForm}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              id="role"
              type="checkbox"
              checked={role}
              onChange={(e) => setRole(e.target.checked)}
            />
            <label htmlFor="role" style={{ color:"red",backgroundColor:'black', padding:'0 2%'}}>Admin</label>
          </div>
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
