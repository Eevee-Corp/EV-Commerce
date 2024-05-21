import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
      <nav className="navbar">
          <div className="navbar-logo">
              <Link to="/">EV Commerce</Link>
          </div>
          <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Your Listings</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="navbar-search">
              <input type="text" placeholder="Search products..." />
              <button type="button">Search</button>
          </div>
          <div className="navbar-cart">
              <Link to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="cart-count">{count}</span>
              </Link>
          </div>
      </nav>
  );
};

export default Nav;