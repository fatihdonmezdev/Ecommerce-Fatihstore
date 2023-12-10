import React, { useEffect, useState } from "react";
import Login from "../login";
import { auth } from "../_app";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/admin/dashboard");
      } else {
      }
    });
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default Admin;
