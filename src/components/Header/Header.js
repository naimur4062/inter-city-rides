import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='header container d-flex justify-content-between mt-5'>
            <h2>Inter City Riders</h2>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/">Blog</Link>
                <Link to="/">Contact</Link>
                <Link to="/destination">
                    <button className="login-btn">Login</button>
                </Link>
            </nav>
        </div>
    );
};

export default Header;