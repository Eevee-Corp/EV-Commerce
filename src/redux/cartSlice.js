// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  item: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.count++;  
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

