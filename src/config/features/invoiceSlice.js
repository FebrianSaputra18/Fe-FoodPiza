import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("authToken");
export const getInvoice = createAsyncThunk(
  "invoice/getInvoice",
  async (order_id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/invoice/${order_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
      invoiceItems: [],
      status: "idle",
      error: "error",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        //getInvoice
        .addCase(getInvoice.fulfilled, (state, action) => {
          state.loading = false;
          state.invoiceItems = action.payload
        })
        .addCase(getInvoice.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getInvoice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
    },
  });
  export default invoiceSlice.reducer;
