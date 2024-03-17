import React from "react";
import { Navbar, OrderList } from "../../components";

function Order() {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              List Order
            </h1>
          </div>
        </header>
        <main>
          <div className="grid grid-flow-col bg-gray-900 h-screen justify-stretch py-6 sm:px-6 lg:px-8">
            <OrderList />
          </div>
        </main>
      </div>
    </>
  );
}

export default Order;
