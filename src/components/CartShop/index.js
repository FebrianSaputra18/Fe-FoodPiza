import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { addToCart, getCart } from "../../config/features/cartSlice";
import { getAddress } from "../../config/features/addressSlice";
import { Button, Label, Modal, Radio, Select } from "flowbite-react";
import { addToOrder } from "../../config/features/orderSlice";
import { useNavigate } from "react-router-dom";
import { getInvoice } from "../../config/features/invoiceSlice";

function CartList({ cartItems }) {
  const cartList = useSelector((state) => state.cart.cartItems);
  const addressList = useSelector((state) => state.address.addressItems);
  const data = addressList.data;
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalAll, setTotalAll] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fecthData = async () => {
      try {
        await dispatch(getCart());
      } catch (error) {
        console.log("Error getting Cart", error);
      }
    };
    fecthData();
  }, [dispatch]);
  useEffect(() => {
    const fecthData = async () => {
      try {
        await dispatch(getAddress());
      } catch (error) {
        console.log("Error getting Address", error);
      }
    };
    fecthData();
  }, [dispatch]);
  useEffect(() => {
    if (!cartList) {
      console.error("Cart list is undefined");
      return;
    }

    // Calculate subtotal
    const calculatedSubtotal = cartList.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setSubtotal(calculatedSubtotal);

    // Calculate delivery fee
    let fee = 3000;
    setDeliveryFee(fee);

    // Calculate total all (subtotal + delivery fee)
    setTotalAll(calculatedSubtotal + deliveryFee);
  }, [cartList, deliveryFee]);
  const handleIncreaseDecrease = (cartId, increase = true) => {
    const selectedItem = cartList.find((cartItem) => cartItem._id === cartId);
    if (selectedItem) {
      const cartPayload = cartList
        .map(({ _id, product, qty }) => {
          let nextQty = qty;
          if (_id === cartId) {
            if (increase) nextQty += 1;
            else nextQty -= 1;
          }

          return {
            productId: product._id,
            qty: nextQty,
          };
        })
        .filter(({ qty }) => qty >= 1);

      console.log(cartPayload, cartItems, selectedItem, "Add Successfully");

      dispatch(addToCart(cartPayload))
        .unwrap()
        .then(() => {
          dispatch(getCart());
        })
        .catch(
          (error) => {
            console.error("Error adding to cart:", error);
          },
          [dispatch]
        );
    } else {
      console.error("Item not found");
    }
  };
  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   const dataOrder = {
  //     delivery_fee: deliveryFee,
  //     delivery_address: selectedAddress,
  //     cart: cartList
  //   }
  //   dispatch(addToOrder(dataOrder))
  //   console.log("data order", dataOrder);
  //   navigate(`/invoice/${response.payload.order.in_id}`);
  // }
  const handlePayment = (e) => {
    e.preventDefault();
    const dataOrder = {
      delivery_fee: deliveryFee,
      delivery_address: selectedAddress,
      cart: cartList
    };
    dispatch(addToOrder(dataOrder))
    navigate('/order')
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <section aria-labelledby="cart-heading">
          {cartList && cartList.length > 0 ? (
            cartList?.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-3 p-8 m-2 bg-white shadow-md rounded-xl"
              >
                <div className="col-span-2 flex w-96">
                  <div className="w-44">
                    <img
                      src={`http://localhost:3000/images/products/${item.image_url}`}
                      alt="img"
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="pl-8">
                    <p className="font-semibold bg-clip-text">{item.name}</p>
                    <p className="font-thin">{item.product.description}</p>

                    <div className="pt-5 flex">
                      <button
                        onClick={() => handleIncreaseDecrease(item._id, false)}
                        className="w-6 bg-white h-6 border-b-2 rounded-full"
                      >
                        -
                      </button>
                      <p className="px-2">{item.qty}</p>
                      <button
                        onClick={() => handleIncreaseDecrease(item._id)}
                        className="w-6 bg-gray-800 text-white h-6 rounded-full"
                      >
                        +
                      </button>
                    </div>
                    <p className="pt-4">Rp. {item.price}</p>
                  </div>
                </div>
                <div className="text-end">
                  <button>x</button>
                </div>
              </div>
            ))
          ) : (
            <p>Silahkan pesan..</p>
          )}
        </section>
        <section aria-labelledby="cart-heading">
          <div className="p-8 m-2 h-30 bg-gray-800 shadow-md rounded-xl">
            <fieldset className="text-white flex flex-col gap-4">
              <legend className="mb-4">Cantumkan alamat pengiriman</legend>
              {data?.map((item) => (
                <div key={item._id} className="flex items-center gap-2">
                  <Radio
                    type="radio"
                    id={`address_${item._id}`}
                    name="addresses"
                    value={`${item.nama} | ${item.kelurahan}, ${item.kecamatan}, ${item.kabupaten}, ${item.provinsi} ${item.detail}`} // Menggunakan nilai yang unik sebagai value
                    onChange={() => setSelectedAddress(item)} // Mengatur alamat yang dipilih saat radio button diubah
                    checked={selectedAddress && selectedAddress._id === item._id} // Mengecek apakah alamat yang dipilih sesuai dengan alamat saat ini
                    className="mr-2"
                  />
                  <Label className="text-white" htmlFor={`address_${item._id}`}>
                    {" "}
                    {item.nama} | {item.kelurahan}, {item.kecamatan},
                    {item.kabupaten}, {item.provinsi} <br /> {item.detail}
                  </Label>
                </div>
              ))}
              <div className="text-end">
                <button
                  onClick={() => setOpenModal(true)}
                  className="btn bg-white text-gray-800 p-2 w-15 rounded-full"
                >
                  {" "}
                  <FaPlus />
                </button>
              </div>
            </fieldset>
          </div>
          {cartList && cartList.length > 0 && (
            <div className="p-8 m-2 h-30 bg-white shadow-md rounded-xl">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-start-2 col-span-4 w-80 text-center">
                  <h2 className="justify-item-start text-2xl">Order summary</h2>
                </div>
                <div className="col-start-1 col-end-3">
                  <p className="font-thin">Subtotal</p>
                </div>
                <div className="col-end-7 col-span-2 ">{subtotal}</div>
                <hr className="col-span-6" />
                <div className="col-start-1 col-end-3">
                  <p className="font-thin">Delivery fee</p>
                </div>
                <div className="col-end-7 col-span-2 ">{deliveryFee}</div>
                <hr className="col-span-6" />
                <div className="col-start-1 col-end-3">
                  <h2>Order Total</h2>
                </div>
                <div className="col-end-7 col-span-2 pb-5">{totalAll}</div>
              </div>
              <hr className="col-span-6" />
              <div className="col-span-6 flex flex justify-center py-5">
                <button onClick={handlePayment} className="btn bg-gray-800 text-white w-80 h-10 rounded-full">
                  Payment
                </button>
              </div>
            </div>
          )}
        </section>
        <Modal
          show={openModal}
          position="center"
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Tambah Alamat</Modal.Header>
          <form className="flex max-w-md flex-col gap-4">
            <Modal.Body>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Select your country" />
                </div>
                <Select id="countries" required></Select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(false)}>I accept</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default CartList;
