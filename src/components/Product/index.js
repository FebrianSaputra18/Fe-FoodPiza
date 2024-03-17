import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../../config/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../config/features/productSlice";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProduct());
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCart());
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleBuy = (_id) => {
    const selectedItem = products.find((item) => item._id === _id);

    if (selectedItem) {
      const cartPayload = carts.map(({ product, qty }) => ({
        productId: product._id,
        qty: product._id === _id ? qty + 1 : qty,
      }));
      console.log(cartPayload, "Add Successfully");

      const isProductExistOnCart = cartPayload.some(
        ({ productId }) => productId === _id
      );
      if (!isProductExistOnCart) cartPayload.push({ productId: _id, qty: 1 });

      dispatch(addToCart(cartPayload))
        .unwrap()
        .then(() => {
          dispatch(getCart());
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    } else {
      console.error("Item not found");
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={`http://localhost:3000/images/products/${product.image_url}`}
                  alt="img"
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                Rp. {product.price}
              </p>
              <button
                onClick={() => handleBuy(product._id)}
                className="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange"
              >
                <ShoppingBagIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                buy
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="shopping-cart" onClick={() => navigate("/cart")}>
        <button>
          <i className="bi bi-cart-check"></i>
        </button>
        <p>{carts?.length ? <span>{carts.length}</span> : <></>}</p>
      </div>
    </div>
  );
}

export default Products;
