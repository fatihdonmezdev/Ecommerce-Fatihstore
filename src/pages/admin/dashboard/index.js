import DashboardStats from "@/components/admin/DashboardStats";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/pages/_app";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const statCards = [
    { name: "Product", amount: productsCount, color: "pink" },
    { name: "Category", amount: categoryCount, color: "yellow" },
    { name: "Users", amount: 116, color: "green" },
    { name: "Order", amount: ordersCount, color: "green" },
  ];
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
        {statCards.map((stat) => (
          <DashboardStats
            key={stat.name}
            name={stat.name}
            amount={stat.amount}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
