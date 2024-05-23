// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('/api/login', { email, password });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const signup = createAsyncThunk('auth/signup', async ({ name, email, password }, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('/api/signup', { name, email, password });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: { user: null, status: 'idle', error: null },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(signup.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../server/models/model.js'

// In authSlice.js

//import supabase from '../supabaseClient'; // adjust the path as needed

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password
    });
    if (error) throw error;
    return { user, token: session.access_token };
  } catch (error) {
    return rejectWithValue(error.error_description || error.message);
  }
});

export const signup = createAsyncThunk('auth/signup', async ({name, email, password }, { rejectWithValue }) => {
  try {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error; // If there's an error, throw to catch it below

    // Optionally return a more detailed response or just user data
    return { user, token: session.access_token }; // Assuming you might want to store the token
  } catch (error) {
    return rejectWithValue(error.message); // Using error.message for a cleaner error text
  }
});


// Continuing in authSlice.js
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null, token: null },
  reducers:{
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Clear token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
        localStorage.setItem('token', action.payload.token); // Store token in local storage
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
            // Add similar cases for signup
  },
});

export default authSlice.reducer;