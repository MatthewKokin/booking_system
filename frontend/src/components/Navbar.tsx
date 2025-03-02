import React from 'react';

interface NavbarProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title"><a href="/">Airbnb Clone</a></h1>
      <div className="search-bar">
        <input type="text" placeholder="Search properties..." value={searchQuery} onChange={handleSearchChange} />
      </div>
      <ul>
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
