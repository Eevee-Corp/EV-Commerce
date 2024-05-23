import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import userProductsReducer from './userProductsSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    userproduct: userProductsReducer
  }
})