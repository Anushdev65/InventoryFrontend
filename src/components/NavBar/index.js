import React from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Logo</h1>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="#">About</Link>
                </li>
                <li>
                    <Link to="/add">Add Product</Link>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;