import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("authToken");

export const getAddress = createAsyncThunk(
  "address/getAdress",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/delivery-addresses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
export const postAddress = createAsyncThunk(
  "address/postAddress",
  async (dataAddress, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/delivery-addresses",
        dataAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressItems: [],
    status: "idle",
    error: "error",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //postAddress
      .addCase(postAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressItems = action.payload;
      })
      .addCase(postAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //getAddress
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressItems = action.payload
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default addressSlice.reducer;
