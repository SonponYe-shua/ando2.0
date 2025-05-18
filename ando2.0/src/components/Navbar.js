// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link className={pathname === '/' ? 'active' : ''} to="/">Home</Link>
      <Link className={pathname.startsWith('/music') ? 'active' : ''} to="/music">Music</Link>
      <Link className={pathname === '/favorites' ? 'active' : ''} to="/favorites">Favorites</Link>
      <Link className={pathname === '/profile' ? 'active' : ''} to="/profile">Profile</Link>
    </nav>
  );
};

export default Navbar;
