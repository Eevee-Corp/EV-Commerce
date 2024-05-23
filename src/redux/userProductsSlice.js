import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchUserProducts = createAsyncThunk('userProducts/fetchUserProducts', async (userId, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`/api/userProducts/${userIdp}`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

export const addUserProduct = createAsyncThunk('userProducts/addUserProduct', async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/postItem', product);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userProductsSlice = createSlice({
  name: 'userProducts',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUserProducts.pending, state => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchUserProducts.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.items = action.payload;
      // })
      // .addCase(fetchUserProducts.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // })
      .addCase(addUserProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default userProductsSlice.reducer;