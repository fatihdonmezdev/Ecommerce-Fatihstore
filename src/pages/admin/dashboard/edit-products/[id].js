import Sidebar from "@/components/admin/Sidebar";
import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { editProductValidationSchema } from "@/validations/editProduct";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/pages/_app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const EditProduct = () => {
  const [productData, setProductData] = useState(null);
  const router = useRouter();
  const productId = router.query.id;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (productDoc.exists()) {
          setProductData(productDoc.data());
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const formik = useFormik({
    enableReinitialize: true, // Enable reinitialization
    initialValues: {
      name: productData?.name || "",
      description: productData?.description || "",
      category: productData?.category || "",
      price: productData?.price || 0,
    },
    validationSchema: editProductValidationSchema,
    onSubmit: async (values) => {
      try {
        await updateDoc(doc(db, "products", productId), values);
        toast.success("Product updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error updating product", error);
        toast.error("Error updating product");
      }
    },
  });
  if (!productData || !formik) {
    return <div>Loading product data...</div>;
  }
  return (
    <div>
      <Sidebar />
      <div className="mt-40 ml-80">
        <h1 className="text-center mb-10 text-4xl font-semibold text-gray-900 dark:text-white">
          Edit Product
        </h1>
        {productData && formik ? (
          <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your product name
              </label>
              <input
                type="text"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Iphone 11"
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your product description.
              </label>
              <input
                type="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                placeholder="Your product description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500">{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="mb-5">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your product category.
              </label>
              <input
                type="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                placeholder="Your product category"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500">{formik.errors.category}</div>
              ) : null}
            </div>

            <div className="mb-5">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your product's price.
              </label>
              <input
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                placeholder="Your product's price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-500">{formik.errors.price}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        ) : (
          <div>Loading product data...</div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProduct;
