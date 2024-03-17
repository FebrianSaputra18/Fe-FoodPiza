import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const product = await response.data.data
      console.log("product Data ===> ", product);
      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    error: "error",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
