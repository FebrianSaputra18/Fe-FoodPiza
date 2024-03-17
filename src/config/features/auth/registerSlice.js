import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postRegister = createAsyncThunk(
  "register/postregister",
  async ({ account, thunkAPI }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        account,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("register Data ==>", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    register: [],
    status: "idle",
    error: "error",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.loading = true;
      state.register = action.payload;
    });
  },
});

export default registerSlice.reducer;
