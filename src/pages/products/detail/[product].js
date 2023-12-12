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
  const thisPage = products.find(
    (product) => product.id === router.query.product
  );
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
      <div className="my-8 text-3xl font-bold text-center">
        Recommended {thisPage.category}
        {/* Products in the same category are displayed. */}
      </div>
      <div className="grid grid-cols-3 gap-20 mx-40 mb-20">
        {products
          .filter(
            (product) =>
              product.category === thisPage.category &&
              product.id !== thisPage.id
          )
          .map((product) => (
            <Cards key={product.id} product={product} />
          ))}
      </div>
      <FooterIcons />
    </div>
  );
};

export default ProductDetail;
