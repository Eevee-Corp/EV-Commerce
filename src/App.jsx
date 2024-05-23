import React from 'react';
import { Route, Routes, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Nav from './components/Nav/Nav.jsx';
import Products from './components/Products/Products.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import Cart from './components/Cart/Cart.jsx';
import UserProductsPage from './components/Listings/Listings.jsx';


export function App () {
  const dispatch = useDispatch();
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<UserProductsPage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}