import React from 'react'
import { CartList, Navbar } from '../../components'

function CartShop() {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Cart Checout
            </h1>
          </div>
        </header>
        <main>
          <div className="grid grid-flow-col bg-gray-100 justify-stretch max-w py-6 sm:px-6 lg:px-8">
            <CartList />
          </div>
        </main>
      </div>
    </>
  )
}

export default CartShop