import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
    cart: cartReducer
  }
})