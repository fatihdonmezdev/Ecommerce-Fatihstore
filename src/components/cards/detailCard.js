import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCart";

const DetailCard = ({ product }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 mx-8 lg:mb-40">
      <div className="lg:ml-20">
        <div className="bg-gray-200 text-lg lg:h-[400px] sm:max-w-[40rem] lg:w-full flex items-center">
          <Image
            alt="Hero"
            width={220}
            height={220}
            className="mx-auto object-cover "
            src={product?.image}
          />
        </div>
      </div>
      <div className="lg:pl-10 text-lg  ">
        <p className="font-bold text-3xl mt-2 sm:text-2xl md:text-3xl lg:text-4xl">
          {product?.name}
        </p>
        <p className="mt-2 text-3xl">{product?.category}</p>

        <p className="text-3xl font-semibold mt-4 mb-4">${product?.price}</p>
        <p className="font-bold mt-2 text-3xl">Description</p>
        <p className="text-2xl">{product?.description}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default DetailCard;
