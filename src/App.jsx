import React from 'react';
import { Route, Routes, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Nav from './components/Nav/Nav.jsx';


export function App () {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <h1>Welcome { new Date().toString() }</h1>
    </div>
  );
}