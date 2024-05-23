// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  items: [],
  status: 'idle',
  error: null
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const response = await fetch(`http://localhost:3000/cart/${userId}`);
  const data = await response.json();
  console.log(data);
  return data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.count++;  
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.count--;
      }
    },
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.count = action.payload.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.count = action.payload.count;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;

