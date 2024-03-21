import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaTrash } from "react-icons/fa";
import { addToCart, getCart } from "../../config/features/cartSlice";
import { getAddress, postAddress } from "../../config/features/addressSlice";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Radio,
  TextInput,
  Textarea,
} from "flowbite-react";
import { addToOrder } from "../../config/features/orderSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";

function CartList({ cartItems }) {
  const cartList = useSelector((state) => state.cart.cartItems);
  const addressList = useSelector((state) => state.address.addressItems);
  const data = addressList.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalAll, setTotalAll] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalTrash, setOpenModalTrash] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataRegencies, setDataRegencies] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataVillages, setDataVillages] = useState([]);

  const [name, setName] = useState("");
  const [provincesSelect, setProvincesSelect] = useState("");
  const [regenciesSelect, setRegenciesSelect] = useState("");
  const [districtsSelect, setDistrictsSelect] = useState("");
  const [villagesSelect, setVillagesSelect] = useState("");
  const [details, setDetails] = useState("");

  // const [selectedAddresses, setSelectedAddresses] = useState([]);
  // const [dataCheckbok, setDataCheckbok] = useState([]);

  // const handleCheckboxChange = (e, id) => {
  //   if (e.target.checked) {
  //     setSelectedAddresses([...selectedAddresses, id]);
  //   } else {
  //     setSelectedAddresses(
  //       selectedAddresses.filter((selectedId) => selectedId !== id)
  //     );
  //   }
  // };

  // const handleDelete = () => {
  //   // Kirim permintaan ke endpoint delete address dengan selectedAddresses
  //   // Implementasi penghapusan sesuai kebutuhan aplikasi Anda
  //   // Pastikan Anda memiliki endpoint delete address yang sesuai di backend Anda
  // };

  useEffect(() => {
    const provinsi = async () => {
      const response = await axios
        .get("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
      const provinces = await response.data;
      const result = provinces.map((data) => {
        return {
          label: data.name,
          value: data.id,
        };
      });
      console.log("Provinsi", result);
      setDataProvinces(result.sort((a, b) => a.label.localeCompare(b.label)));
    };
    provinsi();
  }, []);

  useEffect(() => {
    const kabupaten = async () => {
      const response = await axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provincesSelect}.json`
        )
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
      const regencies = await response.data;
      const result = regencies.map((data) => {
        return {
          label: data.name,
          value: data.id,
        };
      });
      console.log("Kabupaten", result);
      setDataRegencies(result.sort((a, b) => a.label.localeCompare(b.label)));
    };
    if (provincesSelect > 0) {
      kabupaten();
    }
  }, [provincesSelect]);

  useEffect(() => {
    const kecamatan = async () => {
      const response = await axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regenciesSelect}.json`
        )
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
      const districts = await response.data;
      const result = districts.map((data) => {
        return {
          label: data.name,
          value: data.id,
        };
      });
      console.log("Kecamatan", result);
      setDataDistricts(result.sort((a, b) => a.label.localeCompare(b.label)));
    };
    if (regenciesSelect > 0) {
      kecamatan();
    }
  }, [regenciesSelect]);

  useEffect(() => {
    const kelurahan = async () => {
      const response = await axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtsSelect}.json`
        )
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
      const villages = await response.data;
      const result = villages.map((data) => {
        return {
          label: data.name,
          value: data.id,
        };
      });
      console.log("Kelurahan", result);
      setDataVillages(result.sort((a, b) => a.label.localeCompare(b.label)));
    };
    if (districtsSelect > 0) {
      kelurahan();
    }
  }, [districtsSelect]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !details) {
      alert("Mohon isi nama dan detail alamat.");
      return;
    }
    const selectedProvince = dataProvinces.find(
      (province) => province.value === provincesSelect
    );
    const selectedRegencie = dataRegencies.find(
      (regencie) => regencie.value === regenciesSelect
    );
    const selectedDistrict = dataDistricts.find(
      (district) => district.value === districtsSelect
    );
    const selectedVillage = dataVillages.find(
      (village) => village.value === villagesSelect
    );

    const submitAddress = {
      nama: name,
      provinsi: selectedProvince.label,
      kabupaten: selectedRegencie.label,
      kecamatan: selectedDistrict.label,
      kelurahan: selectedVillage.label,
      detail: details,
    };

    console.log(submitAddress, "submitAddress Done!");

    try {
      await dispatch(postAddress(submitAddress)).then((response) => {
        toast.success("alamat berhasil dibuat!");
        console.log("Address added : ", response);
        setOpenModal(false);
        dispatch(getAddress());
      });
    } catch (error) {
      console.error(error, " errrrrr bang");
    }
  };

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
  const handlePayment = (e) => {
    e.preventDefault();
    const dataOrder = {
      delivery_fee: deliveryFee,
      delivery_address: selectedAddress,
      cart: cartList,
    };
    dispatch(addToOrder(dataOrder));
    navigate("/order");
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <Toaster
          position="center-top"
          reverseOrder={false}
          containerClassName=""
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
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
                    value={`${item.nama} | ${item.kelurahan}, ${item.kecamatan}, ${item.kabupaten}, ${item.provinsi} ${item.detail}`}
                    onChange={() => setSelectedAddress(item)}
                    checked={
                      selectedAddress && selectedAddress._id === item._id
                    }
                    className="mr-2"
                  />
                  <Label className="text-white" htmlFor={`address_${item._id}`}>
                    {" "}
                    {item.nama} | {item.kelurahan}, {item.kecamatan},
                    {item.kabupaten}, {item.provinsi} <br /> {item.detail}
                  </Label>
                </div>
              ))}
              <div className="text-end gap-2">
                <button
                  onClick={() => setOpenModal(true)}
                  className="btn bg-white text-gray-800 p-2 w-15 rounded-full"
                >
                  {" "}
                  <FaPlus />
                </button>
                <button
                  onClick={() => setOpenModalTrash(true)}
                  className="btn bg-white text-gray-800 p-2 w-15 rounded-full"
                >
                  {" "}
                  <FaTrash />
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
                <button
                  onClick={handlePayment}
                  className="btn bg-gray-800 text-white w-80 h-10 rounded-full"
                >
                  Payment
                </button>
              </div>
            </div>
          )}
        </section>
        <Modal
          show={openModal}
          size="5xl"
          position="center"
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Tambah Alamat</Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="w-lg my-6 flex gap-2">
                <div className="mb-2 w-full">
                  <Label htmlFor="countries" value="Nama Lengkap" />
                  <TextInput
                    type="text"
                    value={name}
                    className="pb-4"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Label htmlFor="countries" value="Tambahkan Keterangan" />
                  <Textarea
                    placeholder="Leave a comment..."
                    required
                    className="pb-4"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="mb-2 w-full">
                  <Label htmlFor="provinsi" value="Provinsi" />
                  <Select
                    options={dataProvinces}
                    onChange={(e) => setProvincesSelect(e.value)}
                    required
                    className="pb-4"
                  ></Select>
                  <Label htmlFor="regencies" value="Kota/Kabupaten" />
                  <Select
                    options={dataRegencies}
                    onChange={(e) => setRegenciesSelect(e.value)}
                    required
                    className="pb-4"
                  ></Select>
                  <Label htmlFor="districs" value="Kecamatan" />
                  <Select
                    options={dataDistricts}
                    onChange={(e) => setDistrictsSelect(e.value)}
                    required
                    className="pb-4"
                  ></Select>
                  <Label htmlFor="villages" value="Kelurahan/Desa" />
                  <Select
                    options={dataVillages}
                    onChange={(e) => setVillagesSelect(e.value)}
                    required
                    className="pb-4"
                  ></Select>
                </div>
              </div>
              <Modal.Footer>
                <Button type="submit">I accept</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </form>
        </Modal>
        <Modal
          show={openModalTrash}
          size="5xl"
          position="center"
          onClose={() => setOpenModalTrash(false)}
        >
          <Modal.Header>Hapus Alamat!</Modal.Header>
          <form >
            <Modal.Body>
              {data?.map((item) => (
                <div key={item._id} className="flex items-center gap-2">
                  <Checkbox
                    id={`checkbox_${item._id}`}
                    // onChange={(e) => handleCheckboxChange(e, item._id)}
                    // checked={selectedAddresses.includes(item._id)}
                    className="mr-2"
                  />
                  <Label className="outlane" htmlFor={`checkbox_${item._id}`}>
                    {" "}
                    {item.nama} | {item.kelurahan}, {item.kecamatan},
                    {item.kabupaten}, {item.provinsi} <br /> {item.detail}
                  </Label>
                </div>
              ))}
              <Modal.Footer>
                <Button onClick={() => setOpenModalTrash(false)} >I accept</Button>
                <Button color="gray" onClick={() => setOpenModalTrash(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default CartList;
