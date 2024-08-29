// components/layout/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.logo}>
          BlogApp
        </Link>
        <ul className={styles.navList}>
          {!user ? (
            <>
              <li className={styles.navItem}>
                <Link to="/login" className={styles.navLink}>Login</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/register" className={styles.navLink}>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>Blogs</Link>
              </li>
              {user.role === 'customer' && (
                <li className={styles.navItem}>
                  <Link to="/create-blog" className={styles.navLink}>Create Blog</Link>
                </li>
              )}
              {user.role === 'admin' && (
                <li className={styles.navItem}>
                  <Link to="/admin/users" className={styles.navLink}>Manage Customers</Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>

      {user && (
        <div className={styles.navRight}>
          <span className={styles.userInfo}>
            {user.username} ({user.role})
          </span>
          <button onClick={logout} className={styles.logoutButton}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
