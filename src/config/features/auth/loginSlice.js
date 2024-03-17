import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postLogin = createAsyncThunk(
  "login/postLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem('authToken', JSON.stringify(response.data.token))
      console.log("Data login ==>", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    login: [],
    status: "idle",
    error: "error",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.loading = true;
      state.login = action.payload;
      localStorage.setItem('authToken', action.payload.token)
    });
  },
});

export default loginSlice.reducer;
