import Sidebar from "@/components/admin/Sidebar";
import { fetchOrders } from "@/store/orderSlice";
import { fetchProducts } from "@/store/productSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { orders, status } = useSelector((state) => state.orders);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);
  const OrderDetail = (id) => {
    router.push(`/admin/dashboard/orders/${id}`);
  };
  return (
    <div>
      <Sidebar />

      <div class="ml-80 mt-40 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                User's Name
              </th>
              <th scope="col" class="px-6 py-3">
                Adress
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.name}
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.name}
                </th>
                <td class="px-6 py-4">{order.address}</td>
                <td class="px-6 py-4">{order.email}</td>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => OrderDetail(order.id)}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    See Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
