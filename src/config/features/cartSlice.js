import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("authToken");
export const getCart = createAsyncThunk("cart/getList", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:3000/api/carts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (items, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/carts",
        {
          items,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data, "Add To CartAction");
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: "error",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //addCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //getcart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default cartSlice.reducer;
