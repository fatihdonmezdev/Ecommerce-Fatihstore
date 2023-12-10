"use client";
import Image from "next/image";
import logo from "../../../public/logo-black.svg";
import { signOut } from "firebase/auth";
import { auth } from "@/pages/_app";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);
  const products = useSelector((state) => state.cart.items);
  useEffect(() => {
    setAmount(products ? products.length : 0);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);
  const router = useRouter();
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfull");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:mt-8 items-center gap-4 mb-8 justify-between text-xl lg:mx-8">
      <Link href="/">
        <Image alt="Hero" className="lg:flex" src={logo} />
        <ToastContainer />
      </Link>

      <div className="lg:hidden">
        <button onClick={toggleMobileMenu}>
          <TiThMenu />
        </button>
      </div>

      <div
        className={`lg:flex gap-4 items-center ${
          isMobileMenuOpen ? "flex flex-col" : "hidden"
        }`}
      >
        <Link href="/">
          <p>Home</p>
        </Link>
        <Link href="/products">
          <p>Shop</p>
        </Link>
        {user || (
          <Link href="/register">
            <button className="bg-black px-4 py-2 text-white rounded-lg">
              Register
            </button>{" "}
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-black px-4 py-2 text-white rounded-lg"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="bg-black px-4 py-2 text-white rounded-lg">
              Login
            </button>
          </Link>
        )}
        <div
          onClick={() => router.push("/cart")}
          className="flex justify-center items-center gap-2"
        >
          <CiShoppingCart size={40} />
          <span className="">({amount})</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
