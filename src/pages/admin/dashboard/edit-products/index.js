import Sidebar from "@/components/admin/Sidebar";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productSlice";
import { useRouter } from "next/router";
import ProductsTable from "@/components/admin/ProductsTable";

const EditProduct = () => {
  const router = useRouter();
  const { products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);
  const editProduct = (id) => {
    router.push(`/admin/dashboard/edit-products/${id}`);
  };

  return (
    <div>
      <ProductsTable
        products={products}
        action={editProduct}
        actionType={"Edit"}
      />
    </div>
  );
};

export default EditProduct;
