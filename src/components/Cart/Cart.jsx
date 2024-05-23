import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeItem, fetchCart } from '../../redux/cartSlice';
// import { useAuth } from '@supabase/supabase-js'; 

const Cart = () => {
  const dispatch = useDispatch();
  const { count, items, status, error } = useSelector((state) => state.cart);
  // const { user } = useAuth();
  const userId = 1;

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Number of Items: {count}</p>
      <ul>
        {items.map((item) => (
          <li key={item.product_id}>
            <span>{item.product.productname} - ${item.product.price}</span>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${calculateTotal()}</h3>
    </div>
  );
};

export default Cart;