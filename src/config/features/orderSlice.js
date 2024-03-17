import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("authToken");

export const addToOrder = createAsyncThunk(
  "order/addToOrder",
  async ({ delivery_fee, delivery_address, cart }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        {
          delivery_fee,
          delivery_address,
          cart,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      error.message = "error order";
    }
  }
);
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
const orderSlice = createSlice({
    name: "order",
    initialState: {
      orderItems: [],
      status: "idle",
      error: "error",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        //addToOrder
        .addCase(addToOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addToOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.orderItems = action.payload;
        })
        .addCase(addToOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        //getOrder
        .addCase(getOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.orderItems = action.payload
        })
        .addCase(getOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
    },
  });
  export default orderSlice.reducer;
