import Image from "next/image";
import hero from "public/assets/hero/hero-1.png";
import Watches from "public/assets/categories/watches-category.png";
import ipads from "public/assets/categories/ipads-category.png";
import accessories from "public/assets/categories/accessories-category.png";
import laptops from "public/assets/categories/laptops-category.png";
import phones from "public/assets/categories/phones-category.png";
import tvhome from "public/assets/categories/tv-home-category.png";
import applewatch from "public/assets/products/apple-watch-series-9-aluminum.png";
import ipadpro from "public/assets/products/11-inch-ipad-pro-512gb-space-gray.png";
import tv4k from "public/assets/products/apple-tv-4k-wifi.png";
import discount from "public/assets/images/image-4.svg";

import shippingicon from "public/assets/icons/shipping.svg";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/authSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/pages/_app";
import { useEffect, useState } from "react";
import Cards from "../cards";
import { fetchProducts } from "@/store/productSlice";
import FooterIcons from "../footericons";
import Link from "next/link";

const categoriesData = [
  {
    name: "Watches",
    image: Watches,
  },
  {
    name: "TV & Home",
    image: tvhome,
  },
  {
    name: "Ipads",
    image: ipads,
  },

  {
    name: "Accessories",
    image: accessories,
  },
  {
    name: "Laptops",
    image: laptops,
  },
  {
    name: "Phones",
    image: phones,
  },
];

const Hero = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <div className="relative bg-[#F3F3F3]">
        <Image src={hero} priority={true} alt="Hero" />
        <p className="absolute lg:flex hidden bottom-80 left-40 font-bold text-7xl max-w-2xl">
          Unleash innovation in every byte.
        </p>
        <p className="absolute lg:flex hidden bottom-[16rem] left-40 text-3xl">
          Explore a World of Cutting-Edge Tech
        </p>
        <button className="absolute lg:flex hidden bottom-[10rem] bg-black text-white rounded-xl py-[0.7rem] px-4 left-40 text-xl">
          Shop now
        </button>
      </div>
      <div className="lg:mt-20 mt-10 lg:ml-40 lg:mr-40">
        <div className="flex justify-between">
          <p className=" font-semibold text-2xl">Shop by Categories</p>
          <Link href="/products">
            <p className="text-2xl">Show All</p>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-10 gap-4 max-w-[1200px] mx-auto mt-20 ">
        {categoriesData.map((category) => (
          <div key={category.name} className="bg-[#F3F3F3]  mx-auto ">
            <Link className="cursor-pointer" href="/products">
              <Image alt="Hero" src={category.image} height={400} width={400} />
              <p className="bg-white mx-4 text-3xl lg:text-xl mb-8 text-center py-4 rounded-lg">
                {category.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <div className="text-3xl text-center">New Collections</div>
        <div>
          <div className="text-xl font-bold lg:ml-40">
            Showing 1-3 of 15 products
          </div>
          <div className="grid mt-8 lg:grid-cols-3 grid-cols-1 mx-4 lg:mx-40 gap-4">
            {products.slice(0, 3).map((product) => (
              <Cards key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-40 mx-8 lg:flex justify-between">
        <div className="max-w-[600px]">
          <p className="text-4xl lg:text-5xl  font-bold">Deals of the month</p>
          <p className="text-3xl lg:text-lg  mt-8">
            Get ready for a shopping experience like never before with our Deals
            of the Month! Every purchase comes with exclusive perks and offers,
            making this month a celebration of savvy choices and amazing deals.
            Don't miss out! <br />
            🎁🛒
          </p>
          <button className="bg-black mt-8 flex items-center gap-4 text-white rounded-xl py-[0.7rem] px-4 left-40 lg:text-lg text-4xl">
            View Products <FaArrowRight alt="Hero" />
          </button>
        </div>
        <div className="hidden lg:flex">
          <Image alt="Hero" width={500} height={500} src={discount} />
        </div>
      </div>
      <div className="mx-8 mt-8">
        <FooterIcons />
      </div>
    </div>
  );
};

export default Hero;
