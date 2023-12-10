import Image from "next/image";
import React from "react";
import shippingicon from "../../../public/assets/icons/shipping.svg";
const footerIcons = [
  {
    title: "Free Shipping",
    description: "Free shipping for order above $150",
    icon: shippingicon,
  },

  {
    title: "Money Guarantee",
    description: "Within 30 days for an exchange",
    icon: shippingicon,
  },
  {
    title: "Online Support",
    description: "24 hours a day, 7 days a week",
    icon: shippingicon,
  },
  {
    title: "Flexible Payment",
    description: "Pay with multiple credit cards",
    icon: shippingicon,
  },
];
const FooterIcons = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:mx-40 mb-8 gap-2">
      {footerIcons.map((icons) => (
        <div key={icons.title} className="mt-4 lg:mt-10 lg:mb-10 mx-10">
          <Image alt="Hero" src={icons.icon} />
          <p className="text-2xl lg:text-lg font-bold ">{icons.title}</p>
          <p className="text-3xl lg:text-lg">{icons.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FooterIcons;
