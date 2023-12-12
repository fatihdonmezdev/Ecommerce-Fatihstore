import Cards from "@/components/cards";
import CheckBox from "@/components/checkboxes";
import FooterIcons from "@/components/footericons";
import { fetchProducts } from "@/store/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = products.filter((product) =>
    selectedCategories.length === 0
      ? true
      : selectedCategories.includes(product.category)
  );

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };
  const getUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return uniqueCategories;
  };

  return (
    <div className="grid min-h-screen grid-cols-[auto,1fr,auto] gap-4 mb-10">
      <div className="lg:ml-40 ml-4 font-bold mt-8 lg:mr-20">
        <div>Filter Products</div>
        {getUniqueCategories().map((category) => (
          <CheckBox
            key={category}
            category={category}
            handleCategoryChange={handleCategoryChange}
            selectedCategories={selectedCategories}
          />
        ))}
      </div>

      <div className="mt-8">
        <div className="font-bold">
          Showing {filteredProducts.length} products
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          {filteredProducts.map((product) => (
            <Cards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
