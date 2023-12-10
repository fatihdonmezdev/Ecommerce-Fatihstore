import { addToCart } from "@/store/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    window.location.reload();
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-black px-4 py-4 mt-4 w-full text-white rounded-lg "
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
