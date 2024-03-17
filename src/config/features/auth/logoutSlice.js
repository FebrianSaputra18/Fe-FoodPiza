import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postLogout = createAsyncThunk(
  "logout/postLogout",
  async ( thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem('authToken', JSON.stringify(response.data.token))
      console.log("Data logout ==>", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    logout: [],
    status: "idle",
    error: "error",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postLogout.fulfilled, (state, action) => {
      state.loading = true;
      state.logout = action.payload;
      localStorage.clear()
    });
  },
});

export default logoutSlice.reducer;
