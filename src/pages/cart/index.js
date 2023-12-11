import { decreaseQuantity, increaseQuantity } from "@/store/cartSlice";
import { fetchProducts } from "@/store/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../_app";
import Link from "next/link";
import { useRouter } from "next/router";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [userLoginState, setUserLoginState] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setItems(cart);
  }, []);

  const dispatch = useDispatch();
  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
    window.location.reload();
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
    window.location.reload();
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserLoginState(true);
    } else {
      setUserLoginState(false);
    }
  });

  const orderHandler = () => {
    router.push("/cart/order");
  };
  return (
    <>
      <div className="lg:flex justify-center my-40 mb-80">
        <div className="lg:mr-20 lg:w-[50rem] border-2 p-8">
          <div className="text-xl font-bold mb-4">Cart</div>
          <div className="flex text-md font-semibold mb-4 justify-between">
            <div className="lg:w-48">Products</div>
            <div className="ml-4">Quantity</div>
            <div className="ml-4">Subtotal</div>
          </div>
          <div className="border-[0.1rem]"></div>

          {items?.length > 0 ? (
            items?.map((product) => (
              <div
                key={product.id}
                className="flex lg:flex-row flex-col justify-between items-center gap-8 py-2"
              >
                <div className="flex gap-8">
                  <img
                    className="lg:w-20"
                    src={product?.image}
                    alt={product?.name}
                  />
                  <div className="lg:w-48 hidden  lg:flex">{product?.name}</div>
                </div>
                <div className="ml-4 flex items-center justify-center">
                  <button
                    className="mx-4"
                    onClick={() => handleDecreaseQuantity(product)}
                  >
                    <CiSquareMinus size={30} />
                  </button>
                  {product?.quantity}
                  <button
                    className="mx-4"
                    onClick={() => handleIncreaseQuantity(product)}
                  >
                    <CiSquarePlus size={30} />
                  </button>
                </div>
                <div className="ml-4">{`$${product?.price}`}</div>
              </div>
            ))
          ) : (
            <div className="text-center">No items in cart</div>
          )}
        </div>

        <div className="border lg:max-h-[20rem] px-4 lg:px-12 py-4">
          <div className="font-bold text-sm mb-4 border-b-2 max-w-[15rem]">
            Summary
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span className="font-bold">$5.00</span>
          </div>
          <div className="flex justify-between">
            <span>Grand Total:</span>
            <span className="font-bold">
              $
              {items
                ?.reduce((total, product) => total + product.subtotal, 5)
                ?.toFixed(2)}
            </span>
          </div>
          {userLoginState ? (
            <button
              onClick={orderHandler}
              type="button"
              className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Order Now
            </button>
          ) : (
            <Link href="/login">
              <button
                type="button"
                className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login to Order
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
