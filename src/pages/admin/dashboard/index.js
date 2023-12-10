import { getProductsCount } from "@/auth/firebaseUtils";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/pages/_app";
import { fetchOrders } from "@/store/orderSlice";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  useEffect(() => {
    async function fetchOrdersCount() {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const count = ordersSnapshot.size;
        setOrdersCount(count);
      } catch (error) {
        console.error("Error getting orders:", error.message);
      }
    }

    async function fetchProductsCount() {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        let categoryCount = 0;
        let uniqueCategories = new Set();

        productsSnapshot.forEach((doc) => {
          const category = doc.data().category;

          if (!uniqueCategories.has(category)) {
            uniqueCategories.add(category);
            categoryCount++;
          }
        });
        const count = productsSnapshot.size;
        setCategoryCount(categoryCount);
        setProductsCount(count);
      } catch (error) {
        console.error("Error getting products:", error.message);
      }
    }

    fetchProductsCount();
    fetchOrdersCount();
  }, []);
  return (
    <div>
      <Sidebar />
      <div className="text-center text-3xl my-20">
        Welcome to the Admin Dashboard!
      </div>
      <div className="grid ml-80 grid-cols-3">
        <div class=" block max-w-[18rem] rounded-lg bg-green-600 ">
          <div class="border-b-2 font-bold border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
            Product Amount
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
              Current Amount of Products
            </h5>
            <p class="text-3xl text-right text-black dark:text-neutral-50">
              {productsCount}
            </p>
          </div>
        </div>
        <div class=" block max-w-[18rem] rounded-lg bg-yellow-600 ">
          <div class="border-b-2 font-bold border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
            Category Amount
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
              Current Amount of Categories
            </h5>
            <p class="text-3xl text-right text-black dark:text-neutral-50">
              {categoryCount}
            </p>
          </div>
        </div>
        <div class=" block max-w-[18rem] rounded-lg bg-pink-600 ">
          <div class="border-b-2 font-bold border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
            User Amount
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
              Current Amount of Users
            </h5>
            <p class="text-3xl text-right text-black dark:text-neutral-50">
              116
            </p>
          </div>
        </div>
        <div class=" block mt-8 max-w-[18rem] rounded-lg bg-pink-600 ">
          <div class="border-b-2 font-bold border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
            Order Amount
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
              Current Amount of Orders
            </h5>
            <p class="text-3xl text-right text-black dark:text-neutral-50">
              {ordersCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
