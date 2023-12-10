import { db } from "@/pages/_app";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const OrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const router = useRouter();
  const orderId = router.query.id;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const OrderDoc = await getDoc(doc(db, "orders", orderId));
        if (OrderDoc.exists()) {
          setOrderData(OrderDoc.data());
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    if (orderId) {
      fetchProductData();
    }
  }, [orderId]);
  console.log(orderData);
  return (
    <div className="flex justify-center items-center">
      <div>{orderData.name}</div>
    </div>
  );
};

export default OrderDetail;
