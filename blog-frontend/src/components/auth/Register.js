import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password , role);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <label htmlFor='checkbox' >Admin</label>
        <input type="checkbox" value={role} onChange={(e) => {
          console.log("e.target.value",e.target.value,e.target.checked);
          
          setRole(e.target.checked)
        }} placeholder="Role"  />

        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
