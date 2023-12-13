import React from "react";
import facebook from "/public/assets/footer/facebook.svg";
import instagram from "/public/assets/footer/instagram.svg";
import twitter from "/public/assets/footer/twitter.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-black pb-4 pt-4 lg:px-10  flex justify-between ">
      <Image
        width={100}
        height={100}
        alt="Hero"
        className="w-40 h-auto"
        src="https://i.ibb.co/rvfytMz/FD-black.png"
      />
      <p className="text-white hidden">
        @2023 Fatih Donmez. All Rights are reserved
      </p>
      <div className="flex lg:gap-8">
        <Image alt="Hero" className="w-12" src={facebook} />
        <Image alt="Hero" className="w-12" src={twitter} />
        <Image alt="Hero" className="w-12" src={instagram} />
      </div>
    </div>
  );
};

export default Footer;
