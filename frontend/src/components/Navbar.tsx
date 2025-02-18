import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Airbnb Clone</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/listings">Listings</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
