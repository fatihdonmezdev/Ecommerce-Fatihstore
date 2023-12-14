import ProductsTable from "@/components/admin/ProductsTable";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/pages/_app";
import { fetchProducts } from "@/store/productSlice";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoveProduct = () => {
  const { products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);
  const removeProduct = async (id) => {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    toast.success("Product removed successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <div>
      <ToastContainer />
      <ProductsTable
        products={products}
        action={removeProduct}
        actionType={"Remove"}
      />
    </div>
  );
};

export default RemoveProduct;
