import Cards from "@/components/cards";
import DetailCard from "@/components/cards/detailCard";
import FooterIcons from "@/components/footericons";
import { fetchProducts } from "@/store/productSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const router = useRouter();
  const productid = router.query.product;
  const product = products.find((product) => product.id === productid);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);
  return (
    <div className="">
      <DetailCard product={product} />
      <FooterIcons />
    </div>
  );
};

export default ProductDetail;
