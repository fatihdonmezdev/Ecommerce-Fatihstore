import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/pages/_app";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const OrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const router = useRouter();
  const orderId = router.query.id;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setOrderLoading(true);
        const OrderDoc = await getDoc(doc(db, "orders", orderId));
        if (OrderDoc.exists()) {
          setOrderData(OrderDoc.data());
        } else {
          console.error("Product not found");
        }
        setOrderLoading(false);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    if (orderId) {
      fetchProductData();
    }
  }, [orderId]);
  return (
    <div>
      {orderLoading ? (
        <p className="flex justify-center items-center">Loading...</p>
      ) : (
        <>
          <div className="flex mt-20 mb-10 justify-center items-center">
            <div className="border-2 border-black w-96 p-8 text-center">
              <div className="flex">
                <p>Ordered by:</p>
                <p className="ml-8 font-bold"> {orderData?.name}</p>
              </div>
              <div className="flex">
                <p>User email:</p>
                <p className="ml-8 font-bold"> {orderData?.email}</p>
              </div>
              <div className="flex">
                <p>User address:</p>
                <p className="ml-8 font-bold"> {orderData?.address}</p>
              </div>
            </div>
          </div>
          <table class="mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData?.items?.map((item) => (
                <tr
                  key={item?.name}
                  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.name}
                  </th>
                  <td class="px-6 py-4">{item?.category}</td>
                  <td class="px-6 py-4">{item?.subtotal.toFixed(2)}</td>
                  <td class="px-6 py-4">{item?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
