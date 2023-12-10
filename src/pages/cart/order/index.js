import { db } from "@/pages/_app";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const OrderProducts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "orders"), {
      items,
      name,
      email,
      address,
    });
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setItems(cart);
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit} className="mx-80">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="address">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Place Order
          </button>
        </div>
      </form>
    </>
  );
};

export default OrderProducts;
