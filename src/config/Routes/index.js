import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { CartShop, Home, Login, Order, Register } from "../../pages";
import Invoice from "../../pages/Invoice";

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartShop />} />
        <Route path="/invoice/:order_id" element={<Invoice />} />
        <Route path="/order" element={<Order />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
