import Hero from "@/components/hero";
import { updateCart } from "@/store/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCart());
  });
  return (
    <>
      <Hero />
    </>
  );
}
