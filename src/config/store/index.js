import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";
import logoutReducer from "../features/auth/logoutSlice";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";
import addressReducer from "../features/addressSlice";
import orderReducer from "../features/orderSlice";
import invoiceReducer from "../features/invoiceSlice";

export const store = configureStore({
  reducer: {
    //auth
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,

    //page
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    invoice: invoiceReducer,
  },
});
