import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";

const firebaseConfig = {
  apiKey: "AIzaSyBxcYN5iRK2DlEutna6H-pxyPqw44BkN8I",
  databaseURL: "https://fir-auth-f012e-default-rtdb.firebaseio.com",
  authDomain: "fir-auth-f012e.firebaseapp.com",
  projectId: "fir-auth-f012e",
  storageBucket: "fir-auth-f012e.appspot.com",
  messagingSenderId: "608716918773",
  appId: "1:608716918773:web:5434b3845b0a00e7b2dabc",
  measurementId: "G-L62KT4NQXV",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current route is in the list of admin routes
  const isAdminRoute = router.pathname.startsWith("/admin/dashboard");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);
  return (
    <Provider store={store}>
      {!isAdminRoute && <Navbar />}
      {isAdminRoute && <Sidebar />}
      <Component {...pageProps} />
      {!isAdminRoute && <Footer />}
    </Provider>
  );
}
